import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { useProducts } from "../../hooks/useProducts";
import { SearchProduct } from "../SearchProducts/SearchProducts";

interface ISearchBarProps {
    setSearch: (value: string) => void;
    search: string;
  }

export function SearchBar({setSearch, search}: ISearchBarProps){

    const [isOpen, setIsOpen] = useState(false);
    const modalWinRef = useRef<HTMLDivElement | null>(null);

    const {products} = useProducts()
  
    const handleFocus = () => {
      setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
      };
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          modalWinRef.current &&
          !modalWinRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    return (
      <div className="header">
        <input
          type="text"
          placeholder="Пошук продуктів..."
          onFocus={handleFocus}
          className="input"
          onChange={(event)=>{setSearch(event.target.value)}}
        />
  
        {isOpen && (
          <div ref={modalWinRef} className="search-modal">
            <ul>
                {products.map((product) => {
                    return (search === '' || product.title.toLowerCase().includes(search.toLowerCase())) ? (
                        <li className="search-field" key={product.id} onClick={handleClose}>
                            <SearchProduct
                                id={product.id}
                                name={product.title}
                                price={product.price}
                                img={product.image}
                            ></SearchProduct>
                        </li>
                    ) : null;
                })}
            </ul>
          </div>
        )}
      </div>
    );
};