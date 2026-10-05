
import { useState } from "react";

import likeIcon from "../../assets/favorite_60dp_EA3323_FILL0_wght400_GRAD0_opsz48.svg";
import deslikeIcon from "../../assets/heart_broken_60dp_8B1A10_FILL0_wght400_GRAD0_opsz48.svg";

import "./Button.css";

interface parametro {
    type: string;
}

export default function Button(oqe: parametro) {

    const [likes, setLikes] = useState(0);

    function addLikes() {
        setLikes(likes + 1);
    }

    return (
        <div className="mybuton">

            <button onClick={addLikes}>
                {oqe.type == "like" 
                    ? <img src={likeIcon} /> 
                    : <img src={deslikeIcon} />
                }
            </button>

            <span>{likes}</span>

        </div>
    );
}

