interface IProductProps {
    name: string,
    price: number,
}

export function Product(props:IProductProps){
    return (
        <div>
            <h1>{props.name}</h1>
            <h2>{props.price}</h2>
        </div>
    )
}
