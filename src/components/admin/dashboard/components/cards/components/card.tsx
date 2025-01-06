interface DashboardCardProps {
    title: string;
    data: number
}

const DashboardCard = ({title, data}: DashboardCardProps) => {
    return (
        <div className="bg-mineshaft-900 roundedlg shadow-md p-4">
          <h2 className="text-5xl font-bold text-center text-amber-500">{data}</h2>
          <p className="text-xl font-bold text-center text-mineshaft-400">{title}</p>
        </div>
    );
}

export default DashboardCard;