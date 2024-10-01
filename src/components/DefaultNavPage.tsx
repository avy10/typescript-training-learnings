import { FC } from "react";
interface IDefaultNavPageProps {
  pageName: string;
}
const DefaultNavPage: FC<IDefaultNavPageProps> = ({ pageName }) => {
  return <div>{pageName}</div>;
};

export default DefaultNavPage;
