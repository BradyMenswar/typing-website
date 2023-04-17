
export default function Key(props) {

    let background = props.character === props.current.toUpperCase() ? "bg-yellow-400 " : "bg-slate-400 "
    let size = props.character === " " ? "w-[30rem] " : "w-20 "
    return(
        <div className={background + size + "flex p-6 justify-center items-center h-20 rounded-lg text-white"} >
            <p className="text-[2rem] font-bold">{props.character}</p>
        </div>
    );
}