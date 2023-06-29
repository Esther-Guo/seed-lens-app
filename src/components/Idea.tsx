interface IdeaProps {
    ideaData: IdeaStruct[];
}

const Idea: React.FC<IdeaProps> = ({ideaData}) => {
    const ideaItems = ideaData.map((idea,i) =>
        <div key={i} className="p-2">{idea.content}</div>
      );
    return (
        <>
        <div className="divide-y divide-primary text-light w-2/3">{ideaItems}</div>
        </>
    )
}

export default Idea;