import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, BarChart3 } from "lucide-react";

const Home = () => {
  // Mock data for product summary
  const productSummary = {
    total: 124,
    recent: 8,
    pending: 3,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Product Management System
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your product catalog with ease
        </p>
      </header>

      <nav className="mb-8 flex gap-4">
        <Link to="/products">
          <Button variant="outline" className="flex items-center gap-2">
            <ListFilter size={18} />
            Product Listing
          </Button>
        </Link>
        <Link to="/products/new">
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            Register New Product
          </Button>
        </Link>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Product Summary</CardTitle>
            <CardDescription>Overview of your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Products</span>
                <span className="text-xl font-bold">
                  {productSummary.total}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Added This Week</span>
                <span className="text-xl font-bold">
                  {productSummary.recent}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pending Review</span>
                <span className="text-xl font-bold">
                  {productSummary.pending}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Stats
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for product management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/products/new">
              <Button variant="secondary" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary" className="w-full justify-start">
                <ListFilter className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
            </Link>
            <Button variant="secondary" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes to your catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 border-b pb-4 last:border-0"
                >
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">P{item}</span>
                  </div>
                  <div>
                    <p className="font-medium">Product {item} updated</p>
                    <p className="text-sm text-muted-foreground">
                      {item === 1
                        ? "Just now"
                        : item === 2
                          ? "2 hours ago"
                          : "1 day ago"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
