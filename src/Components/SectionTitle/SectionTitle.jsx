

const SectionTitle = ({ heading, subHeading }) => {
    return (
            <div className="text-center mx-auto w-2/3 md:w-4/12 space-y-2 my-8">
                <p className="text-yellow-500">{subHeading}</p>
                <p className="text-3xl border-y-2 py-2 uppercase">{heading}</p>
            </div>
    );
};

export default SectionTitle;