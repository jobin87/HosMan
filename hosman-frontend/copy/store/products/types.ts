export interface newCategoryProps {
  categoryName: string;
  categoryImage: string;
  categoryParent?: string;
}

export interface updateCategoryProps {
  categoryImage: string;
  categoryParent?: string;
  categoryId: string;
}

export interface newBrandProps {
  brandName: string;
  brandLogo: string;
  brandDescription?: string;
  brandWebsite?: string;
}
export interface updateBrandProps {
  brandLogo?: string;
  brandDescription?: string;
  brandWebsite?: string;
  brandId: string;
}

export interface deleteBrandProps {
  id: string;
  parentId?: string;
}
