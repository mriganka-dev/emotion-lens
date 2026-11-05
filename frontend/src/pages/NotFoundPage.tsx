import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="max-w-md space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          404
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Page not found</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-2">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
