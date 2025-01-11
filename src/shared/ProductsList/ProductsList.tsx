import { useEffect, useState } from "react";
import { Product } from "../Product/Product";
import "./ProductsList.css";
import { Vortex } from "react-loader-spinner";

<<<<<<< Updated upstream
import { useProducts } from "../../hooks/useProducts"
=======
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
>>>>>>> Stashed changes


interface IProductsListProps {
  search: string;
}

export function ProductsList({ search }: IProductsListProps) {
  const { products, isLoading, error } = useProducts();

<<<<<<< Updated upstream
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [selectedCategory, setSelectedCategory] = useState('All')

    useEffect(()=>{
        if(selectedCategory === 'All'){
            setFilteredProducts(products)
        } else{
            setFilteredProducts(products.filter( (product)=>{
                return product.category === selectedCategory
            }))
        }
        console.log(selectedCategory)
    }, [selectedCategory, products])



    return <div className="product-list">
        <div className="select-category">
        <select onChange={(event)=>{
            setSelectedCategory(event.target.value)
        }
        }>
            <option value = 'All'>All</option>
            <option value = 'Floppa'>Floppa</option>
            <option value = 'Chat-Bot'>Chat-Bot</option>
            <option value = 'Cats'>Cats</option>
        </select>
        </div>
        <div className="products">
            { isLoading === false ? !error ? filteredProducts.map( (product) => {
                // key - уникальный ключ используется при рендере массивов
                // нужен для идентифицирования reactом элементов которые отображаются
                    // <img src="" alt="" />
                
                return <Product key = {product.id} id={product.id} name = {product.title} price = {product.price} img = {product.image}></Product>
            }) : (<div>{error}</div>) : (<div className="vortex-productList"><Vortex
                visible={true}
                height="200"
                width="200"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'orange']}
                /></div>)}
        </div>
=======
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { categories } = useCategories();

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => {
          return product.category === selectedCategory;
        })
      );
    }
    console.log(selectedCategory);
  }, [selectedCategory, products]);


  console.log(search);

  return (
    <div className="product-list">
      <div className="select-category">
        <select
          onChange={(event) => {
            setSelectedCategory(event.target.value);
          }}
        >
          <option value="All">All</option>
          {categories.map((category) => {
            return <option value={category}>{category}</option>;
          })}
        </select>
      </div>
      <div className="products">
        {isLoading === false ? (
          !error ? (
            filteredProducts.map((product) => {
              // key - уникальный ключ используется при рендере массивов
              // нужен для идентифицирования reactом элементов которые отображаются
              // <img src="" alt="" />
              return (
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  price={product.price}
                  img={product.image}
                ></Product>
              );
            })
          ) : (
            <div>{error}</div>
          )
        ) : (
          <div className="vortex">
            <Vortex
              visible={true}
              height="200"
              width="200"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
          </div>
        )}
      </div>
>>>>>>> Stashed changes
    </div>
  );
}
