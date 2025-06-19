export default function NoData({entity = "Data"}) {
    return (
        <div className="flex flex-1 justify-center items-center min-h-[200px]">
            <span>No {entity} To Show</span>
        </div>
    );
}