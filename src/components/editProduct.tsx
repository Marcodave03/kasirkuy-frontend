"use client";

import * as React from "react";
import { ChevronsUpDown, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/config";

interface Category {
  id: string | number;
  name: string;
}
interface EditProductProps {
  productId: string
  productName: string
  categoryName : string
  categoryId : number
  productPrice: string
  productStock: string
}

const EditProduct: React.FC<EditProductProps> = ({
    //productId,
    productName,
    categoryName,
    categoryId,
    productPrice,
    productStock,
  }) => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [category, setCategory] = React.useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const [items, setItems] = React.useState<Category[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const productData = {
    //   id: productId,
    //   name,
    //   categoryId : category?.id,
    //   categoryName : category?.name,
    //   price,
    //   stock,
    // };
    if (!category?.name || !name || !price || !stock) {
    } else {
      try {
       // let newCategory = { id: category.id, name: category.name };
        if (category && !items.find((item) => item === category)) {
          const categoryResponse = await fetch(
            `${BASE_URL}/api/categories/new_category`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: category.name, companyId: localStorage.getItem("companyId") }),
            }
          );
          if (categoryResponse.ok) {
            const result = await categoryResponse.json();
            setItems((prevItems) => [
              ...prevItems,
              result
            ]);
            setCategory(null);
            //newCategory = { id: result.id, name: result.name };
          } else {
            throw new Error("Failed to add Category");
          }
        }
        // const productResponse = await fetch(
        //   `${BASE_URL}/api/items/edit_product`,
        //   {
        //     method: "PATCH",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       id : productId,
        //       name,
        //       price,
        //       stock,
        //       categoryId : newCategory?.id,
        //       categoryName : newCategory?.name,
        //     })
        //   }
        // );
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error adding product or category:", error);
      }
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories/` + localStorage.getItem("companyId"));
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setItems(
        data.map((category: Category) => ({
          id: category.id,
          name: category.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  React.useEffect(() => {
    fetchCategories();
    setValue(categoryName)
    setCategory({id : categoryId, name : categoryName})
    setName(productName)
    setPrice(productPrice)
    setStock(productStock)
  }, []);

  const handleCreate = () => {
    if (inputValue.trim() !== "") {
      const newCategory = {
        name: inputValue,
      } as Category;
      setItems((prevItems) => [...prevItems]);
      setValue(newCategory.name);
      setCategory(newCategory);
      setOpen(false);
      setInputValue("");
    }
  };
  const router = useRouter();

  const handleDelete = async (item: Category) => {
    try {
      const categoryResponse = await fetch(
        "${BASE_URL}/api/categories/delete/" + item.id,
        {
          method: "DELETE",
        }
      )
      if (categoryResponse.ok) {
        fetchCategories()
      } else {
        throw new Error("Failed to delete category")
      }
    } catch {
      alert("Cannot Delete Category")
    }
    setCategory(null);
    setValue("Select Category...")
    router.push("/dashboard/product");
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className="p-1">
          <Pencil className="dark:text-white text-black w-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Input Your Product</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 text-start">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                  event.preventDefault();
                }
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
                  event.preventDefault();
                }
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category">Category</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between col-span-3"
                >
                  {value ? value : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search category..."
                    value={inputValue}
                    onValueChange={setInputValue}
                  />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {items.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={item.name}
                          onSelect={(currentValue) => {
                            setCategory(item);
                            setValue(currentValue);
                            setOpen(false);
                          }}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-2">
                            <span>{item.name}</span>
                          </div>
                          <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                  }}
                                  className="h-8 w-8"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Deletion</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete the category {item.name}? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleDelete(item)}>
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={handleCreate}
                        className="cursor-pointer"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create &quot;{inputValue}&quot;
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => router.push('/dashboard/product')}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default EditProduct

// 'use client'

// import * as React from "react"
// import { ChevronsUpDown, Pencil, Plus, Trash2 } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useRouter } from "next/navigation"

// interface Category {
//   categoryId: string | number
//   name: string
// }

// interface EditProductProps {
//   productId: string
//   productName: string
//   productCategory: string
//   productPrice: string
//   productStock: string
// }

// const EditProduct: React.FC<EditProductProps> = ({
//   productId,
//   productName,
//   productCategory,
//   productPrice,
//   productStock,
// }) => {
//   const [id, setId] = React.useState(productId)
//   const [name, setName] = React.useState(productName)
//   const [price, setPrice] = React.useState(productPrice)
//   const [stock, setStock] = React.useState(productStock)
//   const [category, setCategory] = React.useState(productCategory)
//   const [isDialogOpen, setIsDialogOpen] = React.useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
//   const [categoryToDelete, setCategoryToDelete] = React.useState<Category | null>(null)

//   const [open, setOpen] = React.useState(false)
//   const [value, setValue] = React.useState<string>("")
//   const [items, setItems] = React.useState<Category[]>([])
//   const [inputValue, setInputValue] = React.useState<string>("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // ... (rest of the handleSubmit function remains the same)
//   }
//   const route = useRouter()
//   const fetchCategories = async () => {
//     try {
//       const response = await fetch("${BASE_URL}/api/categories/1")
//       if (!response.ok) {
//         throw new Error("Failed to fetch categories")
//       }
//       const data = await response.json()
//       setItems(
//         data.map((category: Category) => ({
//           categoryId: category.categoryId,
//           name: category.name,
//         }))
//       )
//     } catch (error) {
//       console.error("Error fetching categories:", error)
//     }
//   }

//   React.useEffect(() => {
//     fetchCategories()
//   }, [])

//   const handleCreate = () => {
//     if (inputValue.trim() !== "") {
//       const newCategory = {
//         categoryId: `temp-${Date.now()}`, // Temporary ID
//         name: inputValue,
//       }
//       setItems((prevItems) => [...prevItems])
//       setValue(newCategory.name)
//       setCategory(newCategory.name)
//       setOpen(false)
//       setInputValue("")
//     }
//   }

//   const handleDelete = async (item: Category) => {
//     try {
//       const categoryResponse = await fetch(
//         "${BASE_URL}/api/categories/delete/" + item.categoryId,
//         {
//           method: "DELETE",
//         }
//       )
//       if (categoryResponse.ok) {
//         fetchCategories()
//         setIsDeleteDialogOpen(false)
//       } else {
//         throw new Error("Failed to delete category")
//       }
//     } catch {
//       alert("Cannot Delete Category")
//     }
//     route.push("/dashboard/product");
//   }

//   return (
//     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//       <DialogTrigger asChild>
//         <div className="p-1">
//           <Pencil className="dark:text-white text-black w-6" />
//         </div>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit Product</DialogTitle>
//           <DialogDescription>Edit Your Product</DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="grid gap-4 py-4 text-start">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name">Name {productName}</Label>
//             <Input
//               id="name"
//               value={name || productName || ""}
//               placeholder={productName}
//               onChange={(e) => setName(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="price">Price</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price || productPrice || ""}
//               placeholder={productPrice}
//               onChange={(e) => setPrice(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="stock">Stock</Label>
//             <Input
//               id="stock"
//               type="number"
//               value={stock || productStock || ""}
//               placeholder={productStock}
//               onChange={(e) => setStock(e.target.value)}
//               className="col-span-3"
//             />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="category">Category</Label>
//             <Popover open={open} onOpenChange={setOpen}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   role="combobox"
//                   aria-expanded={open}
//                   className="w-full justify-between col-span-3"
//                 >
//                   {value ? value : category}
//                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-full p-0">
//                 <Command>
//                   <CommandInput
//                     placeholder="Search category..."
//                     value={inputValue}
//                     onValueChange={setInputValue}
//                   />
//                   <CommandList>
//                     <CommandEmpty>No category found.</CommandEmpty>
//                     <CommandGroup>
//                       {items.map((item) => (
//                         <CommandItem
//                           key={`${item.categoryId}-${item.name}`}
//                           value={item.name}
//                           onSelect={(currentValue) => {
//                             setValue(currentValue)
//                             setCategory(currentValue)
//                             setOpen(false)
//                           }}
//                           className="flex justify-between items-center"
//                         >
//                           <div className="flex items-center space-x-2">
//                             <span>{item.name}</span>
//                           </div>
//                           <div className="flex items-center ml-auto">
//                             <Dialog>
//                               <DialogTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={(e) => {
//                                     e.stopPropagation()
//                                     setCategoryToDelete(item)
//                                   }}
//                                   className="h-8 w-8"
//                                 >
//                                   <Trash2 className="h-4 w-4" />
//                                 </Button>
//                               </DialogTrigger>
//                               <DialogContent>
//                                 <DialogHeader>
//                                   <DialogTitle>Confirm Deletion</DialogTitle>
//                                   <DialogDescription>
//                                     Are you sure you want to delete the category "{item.name}"? This action cannot be undone.
//                                   </DialogDescription>
//                                 </DialogHeader>
//                                 <DialogFooter>
//                                   <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//                                     Cancel
//                                   </Button>
//                                   <Button variant="destructive" onClick={() => handleDelete(item)}>
//                                     Delete
//                                   </Button>
//                                 </DialogFooter>
//                               </DialogContent>
//                             </Dialog>
//                           </div>
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                     <CommandSeparator />
//                     <CommandGroup>
//                       <CommandItem
//                         onSelect={handleCreate}
//                         className="cursor-pointer"
//                       >
//                         <Plus className="mr-2 h-4 w-4" />
//                         Create &quot;{inputValue}&quot;
//                       </CommandItem>
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//           </div>
//           <DialogFooter>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default EditProduct