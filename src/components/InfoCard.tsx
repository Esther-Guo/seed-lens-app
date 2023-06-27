interface InfoCardProps {
    handleCloseInfoClick: () => void;
  }

const InfoCard: React.FC<InfoCardProps> = ({handleCloseInfoClick}) => {
    return (
        <div className="bg-black p-4 opacity-100 w-1/4 border-primary border-2 rounded-lg flex flex-col">
            <p className="text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum eros eget sollicitudin eleifend. Pellentesque nec mollis dolor. Duis hendrerit cursus vulputate. Proin accumsan velit vitae lacus sodales gravida. Proin tincidunt tellus efficitur blandit lobortis. Quisque quam ligula, vulputate non eleifend in, lobortis eget dolor. Suspendisse vitae augue ut ligula consectetur accumsan. Sed blandit tellus tortor, in porttitor eros cursus vel. Curabitur rutrum ipsum tellus, vel laoreet justo bibendum in. Cras lobortis, risus quis consectetur sollicitudin, velit lacus ultricies arcu, vel gravida mi sapien sed lorem. Sed sed congue mi. Vivamus ultricies arcu vel lacus placerat, vitae blandit orci blandit. Duis nec massa faucibus, varius arcu sed, sodales nisi. Nam viverra erat id lectus tincidunt dictum. Donec eros elit, consectetur ut purus eget, tincidunt volutpat nulla. Sed nec elit tempus, elementum orci sit amet, condimentum nunc. Vivamus faucibus a quam vitae porta. Proin nec ante ultrices, viverra nunc eu, aliquam quam. Suspendisse potenti. Sed sapien ligula, fermentum nec mollis sagittis, pulvinar vel metus.
            </p>
            <button className="bg-primary p-2 rounded-lg self-end font-second" onClick={handleCloseInfoClick}>I GET IT</button>
        </div>
    )
}

export default InfoCard;