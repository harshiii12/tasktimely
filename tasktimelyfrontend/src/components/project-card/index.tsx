import { useNavigate } from "react-router-dom";

type TProps = {
    name: string;
    _id: string;
};

const CProjectCard = (props: TProps) => {
    const navigate = useNavigate();
    function navigateToProject() {
        navigate("/project/" + props._id);
    }
    return (
        <div
            className="mr-2 mb-2 mt-2 w-40 h-40 bg-green-700 rounded-xl flex flex-col justify-center align-center hover:bg-green-800 cursor-pointer"
            onClick={() => navigateToProject()}
        >
            <p className="font-bold block w-100 text-center">{props.name}</p>
        </div>
    );
};

export default CProjectCard;
