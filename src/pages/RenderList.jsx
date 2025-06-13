import { useEffect } from "react";
import Header from "./component/Header";
import Main from "./component/Main";

function RenderList({ headline }) {
    useEffect(() => {
        document.title = `${headline}`
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
            <Header />
            <Main headline={ headline }> 
                <ul>
                    {Products.map((product) => (
                        <li key={ product.id }>{ product.name }</li> 
                    ))}
                </ul>
            </Main> 
        </div>
    );
}

export default RenderList