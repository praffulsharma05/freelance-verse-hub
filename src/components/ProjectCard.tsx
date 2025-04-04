
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  className?: string;
};

const ProjectCard = ({ icon, title, description, tags, className = "" }: ProjectCardProps) => {
  return (
    <Card className={`card-hover ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-colancer-purple">
            {icon}
          </div>
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-0">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="bg-gray-100">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
