import { useEffect } from "react";

function RenderList() {
    useEffect(() => {
        document.title = "Render List";
    }, []);

    const Products = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
        { id: 4, name: 'Product 4' },
        { id: 5, name: 'Product 5' },
    ];

    return (
        <div>
            <ul>
                {Products.map((product) => (
                   <li key={ Products.id }>{ product.name }</li> 
                ))}
            </ul>
        </div>
    );
}

export default RenderList