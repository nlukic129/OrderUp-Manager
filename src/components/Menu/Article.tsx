import { IArticle } from "types/venueType";

interface IArticleProps {
  articleData: IArticle;
  categoryType: string;
}

const Article = ({ articleData, categoryType }: IArticleProps) => {
  return (
    <div>
      <p>{articleData.name}</p>
    </div>
  );
};

export default Article;
