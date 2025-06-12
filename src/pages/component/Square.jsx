function Square({value, onSquareClick}) {
    return (
        <div className="w-[50px] h-[50px] border border-black flex justify-center items-center" onClick={onSquareClick} >
            { value }
        </div>
    );
}

export default Square;