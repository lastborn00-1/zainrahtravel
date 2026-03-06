import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Package as PackageIcon,
  BookOpen,
  BarChart3,
  TrendingUp,
  History,
  Clock,
  ExternalLink
} from "lucide-react";
import type { Package, Booking } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    price: "",
    duration: "",
    description: "",
    image: "",
    category: "General",
    featured: 0,
  });

  // Check auth
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["/api/admin/session"],
  });

  useEffect(() => {
    if (!sessionLoading && !session) {
      setLocation("/admin/login");
    }
  }, [session, sessionLoading, setLocation]);

  // Fetch packages
  const { data: packages = [] } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  // Fetch bookings
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/admin/bookings"],
    enabled: !!session,
  });

  // Admin Stats
  const { data: stats } = useQuery<{
    totalPackages: number;
    totalBookings: number;
    recentBookings: Booking[];
  }>({
    queryKey: ["/api/admin/stats"],
    enabled: !!session,
  });

  // Mutations
  const createPackageMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/packages", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({ title: "Package created successfully" });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to create package" });
    },
  });

  const updatePackageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest("PUT", `/api/admin/packages/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({ title: "Package updated successfully" });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to update package" });
    },
  });

  const deletePackageMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/admin/packages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/packages"] });
      toast({ title: "Package deleted successfully" });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to delete package" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/admin/login");
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      destination: "",
      price: "",
      duration: "",
      description: "",
      image: "",
      category: "General",
      featured: 0,
    });
    setEditingPackage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseInt(formData.price),
    };

    if (editingPackage) {
      updatePackageMutation.mutate({ id: editingPackage.id, data });
    } else {
      createPackageMutation.mutate(data);
    }
  };

  const startEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      destination: pkg.destination,
      price: pkg.price.toString(),
      duration: pkg.duration,
      description: pkg.description,
      image: pkg.image,
      category: pkg.category || "General",
      featured: pkg.featured || 0,
    });
    setIsEditDialogOpen(true);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsEditDialogOpen(true);
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-admin-dashboard-title">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {session.username}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview" className="gap-2" data-testid="tab-overview">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="packages" className="gap-2" data-testid="tab-packages">
              <PackageIcon className="h-4 w-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2" data-testid="tab-bookings">
              <BookOpen className="h-4 w-4" />
              Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <PackageIcon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-none">Live</Badge>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Packages</h3>
                <p className="text-3xl font-bold mt-1">{stats?.totalPackages || 0}</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10 border-none">+12%</Badge>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
                <p className="text-3xl font-bold mt-1">{stats?.totalBookings || 0}</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <History className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Recent Activity</h3>
                <p className="text-3xl font-bold mt-1">{stats?.recentBookings?.length || 0}</p>
              </Card>
            </div>

            <Card>
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Bookings
                </h2>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-muted/30 border-b">
                      <th className="p-4 text-sm font-medium">Customer</th>
                      <th className="p-4 text-sm font-medium">Destination</th>
                      <th className="p-4 text-sm font-medium">Date</th>
                      <th className="p-4 text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats?.recentBookings?.map((booking: any) => (
                      <tr key={booking.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <p className="font-medium">{booking.name}</p>
                          <p className="text-xs text-muted-foreground">{booking.email}</p>
                        </td>
                        <td className="p-4 text-sm">{booking.destination}</td>
                        <td className="p-4 text-sm">
                          {new Date(booking.travelDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            New
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!stats?.recentBookings || stats.recentBookings.length === 0) && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-muted-foreground">
                          No recent bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="packages">
            <div className="mb-6">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openCreateDialog} data-testid="button-add-package">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPackage ? "Edit Package" : "Add New Package"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Package Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          data-testid="input-package-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                          id="destination"
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          required
                          data-testid="input-package-destination"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                          data-testid="input-package-price"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="e.g., 7 Days"
                          required
                          data-testid="input-package-duration"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        required
                        data-testid="input-package-description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="e.g., Adventure, Spiritual"
                          required
                          data-testid="input-package-category"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-8">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={formData.featured === 1}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked ? 1 : 0 })}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <Label htmlFor="featured">Featured Package</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <div className="flex gap-4 items-start">
                        <div className="flex-1 space-y-2">
                          <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="/assets/generated_images/..."
                            required
                            data-testid="input-package-image"
                          />
                          <p className="text-xs text-muted-foreground">
                            Use: /assets/generated_images/[filename].png
                          </p>
                        </div>
                        {formData.image && (
                          <div className="w-24 h-16 border rounded overflow-hidden bg-muted">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" data-testid="button-save-package">
                        {editingPackage ? "Update Package" : "Create Package"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                        data-testid="button-cancel-package"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="p-4" data-testid={`card-admin-package-${pkg.id}`}>
                  <div className="flex gap-4">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-32 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg" data-testid={`text-admin-package-name-${pkg.id}`}>
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{pkg.destination}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {pkg.category}
                        </span>
                        {pkg.featured === 1 && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-600 rounded-full border border-yellow-500/20">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${pkg.price} • {pkg.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => startEdit(pkg)}
                        data-testid={`button-edit-package-${pkg.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this package?")) {
                            deletePackageMutation.mutate(pkg.id);
                          }
                        }}
                        data-testid={`button-delete-package-${pkg.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4" data-testid="text-bookings-title">
                Recent Bookings
              </h2>
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No bookings yet
                  </p>
                ) : (
                  bookings.map((booking) => (
                    <Card key={booking.id} className="p-4" data-testid={`card-booking-${booking.id}`}>
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Customer</p>
                          <p className="font-medium" data-testid={`text-booking-name-${booking.id}`}>
                            {booking.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Destination</p>
                          <p className="font-medium">{booking.destination}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Travel Date</p>
                          <p className="font-medium">{booking.travelDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Contact</p>
                          <p className="text-sm">{booking.email}</p>
                          <p className="text-sm">{booking.phone}</p>
                        </div>
                      </div>
                      {booking.message && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-muted-foreground">Message:</p>
                          <p className="text-sm">{booking.message}</p>
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
