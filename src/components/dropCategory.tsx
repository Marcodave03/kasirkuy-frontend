"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { BASE_URL } from "@/app/config";

interface Category {
  categoryId: string | number;
  name: string;
}

export default function ComboboxCategory() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const [items, setItems] = React.useState<Category[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        // Set the fetched categories in the state
        setItems(data.map((category: Category) => ({
          categoryId: category.categoryId,
          name: category.name,
        })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCreate = () => {
    if (inputValue.trim() !== "") {
      const newCategory = {
        categoryId: inputValue.toLowerCase(), // Or generate a unique ID if needed
        name: inputValue,
      };
      // Optionally add the new category to the list
      setItems((prevItems) => [...prevItems, newCategory]);
      setValue(newCategory.name);
      setOpen(false);
      setInputValue("");
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[25vw] justify-between"
        >
          {value
            ? items.find((item) => item.name === value)?.name
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="resize-y overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
          <Command className="overflow-hidden">
            <CommandInput
              placeholder="Search category..."
              className="h-9"
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList className="max-h-[200px] overflow-auto">
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.categoryId}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === item.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem onSelect={handleCreate} className="cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" />
                  Create {inputValue}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="flex h-[10px] cursor-ns-resize items-center justify-center border-t bg-gray-100">
            <div className="h-1 w-8 rounded-full bg-gray-300" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
