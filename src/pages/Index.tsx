
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CategoryModal from "@/components/CategoryModal";

// Sample tree data structure - replace with your actual data
const treeData = [
  {
    id: "1",
    name: "Electronics",
    icon: "smartphone",
    display_path: "Electronics",
    children: [
      {
        id: "1.1",
        name: "Phones",
        icon: "smartphone",
        display_path: "Electronics > Phones",
        children: [
          {
            id: "1.1.1",
            name: "iPhone",
            icon: "smartphone",
            display_path: "Electronics > Phones > iPhone",
            children: []
          },
          {
            id: "1.1.2",
            name: "Samsung",
            icon: "smartphone",
            display_path: "Electronics > Phones > Samsung",
            children: []
          },
          {
            id: "1.1.3",
            name: "Huawei",
            icon: "smartphone",
            display_path: "Electronics > Phones > Huawei",
            children: []
          }
        ]
      },
      {
        id: "1.2",
        name: "Laptops",
        icon: "laptop",
        display_path: "Electronics > Laptops",
        children: [
          {
            id: "1.2.1",
            name: "MacBook",
            icon: "laptop",
            display_path: "Electronics > Laptops > MacBook",
            children: []
          },
          {
            id: "1.2.2",
            name: "Dell",
            icon: "laptop",
            display_path: "Electronics > Laptops > Dell",
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Fashion",
    icon: "shirt",
    display_path: "Fashion",
    children: [
      {
        id: "2.1",
        name: "Men's Clothing",
        icon: "shirt",
        display_path: "Fashion > Men's Clothing",
        children: [
          {
            id: "2.1.1",
            name: "T-Shirts",
            icon: "shirt",
            display_path: "Fashion > Men's Clothing > T-Shirts",
            children: []
          },
          {
            id: "2.1.2",
            name: "Jeans",
            icon: "shirt",
            display_path: "Fashion > Men's Clothing > Jeans",
            children: []
          }
        ]
      },
      {
        id: "2.2",
        name: "Women's Clothing",
        icon: "shirt",
        display_path: "Fashion > Women's Clothing",
        children: [
          {
            id: "2.2.1",
            name: "Dresses",
            icon: "shirt",
            display_path: "Fashion > Women's Clothing > Dresses",
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Home & Garden",
    icon: "home",
    display_path: "Home & Garden",
    children: [
      {
        id: "3.1",
        name: "Furniture",
        icon: "sofa",
        display_path: "Home & Garden > Furniture",
        children: [
          {
            id: "3.1.1",
            name: "Chairs",
            icon: "armchair",
            display_path: "Home & Garden > Furniture > Chairs",
            children: []
          }
        ]
      }
    ]
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category.display_path);
    setSelectedCategoryId(category.id);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Images Section */}
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">Imagini</h2>
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <span className="text-muted-foreground">Upload images here</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-2xl font-bold mb-6">Adaugă Anunț Nou</h2>
                <hr className="mb-6" />
                
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="category-field">Categorie</Label>
                    <Input
                      id="category-field"
                      value={selectedCategory}
                      placeholder="Apasă pentru a selecta o categorie..."
                      readOnly
                      className="cursor-pointer"
                      onClick={() => setModalOpen(true)}
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Publică Anunțul
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        treeData={treeData}
        onSelect={handleCategorySelect}
      />
    </div>
  );
};

export default Index;
