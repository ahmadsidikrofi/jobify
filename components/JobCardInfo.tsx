const JobCardInfo = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
    return ( 
        <div className="flex gap-2">
            {icon}
            {text}
        </div>
    );
}
 
export default JobCardInfo;