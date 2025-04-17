import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, productService } from "@/services/database";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  getProduct: (id: number) => Promise<Product | null>;
  createProduct: (product: Product) => Promise<Product | null>;
  updateProduct: (
    id: number,
    product: Partial<Product>,
  ) => Promise<Product | null>;
  deleteProduct: (id: number) => Promise<boolean>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts deve ser usado dentro de um ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const getProduct = async (id: number) => {
    return await productService.getProductById(id);
  };

  const createProduct = async (product: Product) => {
    const newProduct = await productService.createProduct(product);
    if (newProduct) {
      await refreshProducts();
    }
    return newProduct;
  };

  const updateProduct = async (id: number, product: Partial<Product>) => {
    const updatedProduct = await productService.updateProduct(id, product);
    if (updatedProduct) {
      await refreshProducts();
    }
    return updatedProduct;
  };

  const deleteProduct = async (id: number) => {
    const success = await productService.deleteProduct(id);
    if (success) {
      await refreshProducts();
    }
    return success;
  };

  const value = {
    products,
    loading,
    error,
    refreshProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
