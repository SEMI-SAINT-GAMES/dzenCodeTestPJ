
interface IProps {
    text: string;
}
const NoData = ({text}: IProps) => {
    return (
        <div className='noData'>
            <h2>{text}</h2>
        </div>
    );
};

export default NoData;