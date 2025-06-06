
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Smartphone, Laptop, Shirt, Home, Sofa } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon?: string;
  display_path: string;
  children: Category[];
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  treeData: Category[];
  onSelect: (category: Category) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  treeData,
  onSelect,
}) => {
  const [currentCategories, setCurrentCategories] = useState<Category[]>(treeData);
  const [navigationStack, setNavigationStack] = useState<Category[]>([]);
  const [currentTitle, setCurrentTitle] = useState("Selectează o Categorie");

  // Icon mapping
  const getIcon = (iconName?: string) => {
    const iconMap = {
      smartphone: Smartphone,
      laptop: Laptop,
      shirt: Shirt,
      home: Home,
      sofa: Sofa,
      armchair: Sofa,
    };
    
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Home;
    return <IconComponent className="h-5 w-5" />;
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentCategories(treeData);
      setNavigationStack([]);
      setCurrentTitle("Selectează o Categorie");
    }
  }, [isOpen, treeData]);

  const handleCategoryClick = (category: Category) => {
    if (category.children && category.children.length > 0) {
      // Navigate to subcategories
      setNavigationStack(prev => [...prev, { 
        ...category, 
        children: currentCategories 
      }]);
      setCurrentCategories(category.children);
      setCurrentTitle(category.name);
    } else {
      // Select this category (leaf node)
      onSelect(category);
    }
  };

  const handleBackClick = () => {
    if (navigationStack.length > 0) {
      const previousLevel = navigationStack[navigationStack.length - 1];
      setCurrentCategories(previousLevel.children);
      setNavigationStack(prev => prev.slice(0, -1));
      
      // Update title
      if (navigationStack.length === 1) {
        setCurrentTitle("Selectează o Categorie");
      } else {
        setCurrentTitle(navigationStack[navigationStack.length - 2].name);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader className="flex flex-row items-center space-y-0 pb-4 border-b">
          <div className="flex items-center space-x-2 w-full">
            {navigationStack.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="p-2 h-8 w-8 hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className="flex-1 text-lg font-semibold">
              {currentTitle}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[50vh] py-4">
          <div className="space-y-2">
            {currentCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors border border-border/50 hover:border-border"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-muted-foreground">
                    {getIcon(category.icon)}
                  </div>
                  <span className="font-medium text-foreground">
                    {category.name}
                  </span>
                </div>
                
                {category.children && category.children.length > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
