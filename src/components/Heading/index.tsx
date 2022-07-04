const Heading: React.FC<{ text: string }> = ({ text }) => {
  return <h1 className="text-2xl font-semibold">{text}</h1>;
};

export default Heading;
