import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";

interface Field {
  id: number;
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  isDefault: boolean;
}

const Settings = () => {
  const navigate = useNavigate();

  // Estado para os campos padrão e personalizados
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      name: "titulo",
      label: "Título",
      type: "text",
      required: true,
      isDefault: true,
    },
    {
      id: 2,
      name: "tipo",
      label: "Tipo",
      type: "select",
      required: false,
      options: ["Alimento", "Bebida", "Higiene", "Limpeza", "Outro"],
      isDefault: true,
    },
    {
      id: 3,
      name: "ingredientes",
      label: "Ingredientes",
      type: "textarea",
      required: false,
      isDefault: true,
    },
    {
      id: 4,
      name: "fabricante",
      label: "Fabricante",
      type: "text",
      required: false,
      isDefault: true,
    },
    {
      id: 5,
      name: "local",
      label: "Local",
      type: "text",
      required: false,
      isDefault: true,
    },
    {
      id: 6,
      name: "selos",
      label: "Selos",
      type: "text",
      required: false,
      isDefault: true,
    },
    {
      id: 7,
      name: "variacao",
      label: "Variação",
      type: "text",
      required: false,
      isDefault: true,
    },
    {
      id: 8,
      name: "exportacao",
      label: "Exportação",
      type: "text",
      required: false,
      isDefault: true,
    },
    {
      id: 9,
      name: "macro",
      label: "Macro",
      type: "text",
      required: false,
      isDefault: true,
    },
    {
      id: 10,
      name: "observacoes",
      label: "Observações",
      type: "textarea",
      required: false,
      isDefault: true,
    },
  ]);

  // Estado para o novo campo
  const [newField, setNewField] = useState<Omit<Field, "id" | "isDefault">>({
    name: "",
    label: "",
    type: "text",
    required: false,
  });

  // Estado para o campo em edição
  const [editingField, setEditingField] = useState<Field | null>(null);

  // Estado para o campo a ser excluído
  const [fieldToDelete, setFieldToDelete] = useState<number | null>(null);

  // Estado para controlar o diálogo de adição/edição
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Função para voltar à página anterior
  const handleBack = () => {
    navigate("/");
  };

  // Função para adicionar um novo campo
  const handleAddField = () => {
    if (newField.name && newField.label) {
      const id = Math.max(...fields.map((f) => f.id), 0) + 1;
      setFields([...fields, { ...newField, id, isDefault: false }]);
      setNewField({ name: "", label: "", type: "text", required: false });
      setIsDialogOpen(false);
    }
  };

  // Função para atualizar um campo existente
  const handleUpdateField = () => {
    if (editingField && editingField.name && editingField.label) {
      setFields(
        fields.map((field) =>
          field.id === editingField.id ? editingField : field,
        ),
      );
      setEditingField(null);
      setIsDialogOpen(false);
    }
  };

  // Função para excluir um campo
  const handleDeleteField = () => {
    if (fieldToDelete !== null) {
      setFields(fields.filter((field) => field.id !== fieldToDelete));
      setFieldToDelete(null);
    }
  };

  // Função para abrir o diálogo de edição
  const openEditDialog = (field: Field) => {
    setEditingField(field);
    setIsDialogOpen(true);
  };

  // Função para abrir o diálogo de adição
  const openAddDialog = () => {
    setEditingField(null);
    setNewField({ name: "", label: "", type: "text", required: false });
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full bg-background p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold flex-1">Configurações</h1>
      </div>

      <Tabs defaultValue="fields" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-1">
          <TabsTrigger value="fields">Campos do Produto</TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Gerenciar Campos</CardTitle>
              <Button onClick={openAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Campo
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Rótulo</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Obrigatório</TableHead>
                      <TableHead>Padrão</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field) => (
                      <TableRow key={field.id}>
                        <TableCell>{field.name}</TableCell>
                        <TableCell>{field.label}</TableCell>
                        <TableCell>{field.type}</TableCell>
                        <TableCell>{field.required ? "Sim" : "Não"}</TableCell>
                        <TableCell>{field.isDefault ? "Sim" : "Não"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(field)}
                              disabled={
                                field.isDefault && field.name === "titulo"
                              }
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setFieldToDelete(field.id)}
                                  disabled={
                                    field.isDefault && field.name === "titulo"
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirmar exclusão
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o campo "
                                    {field.label}"?
                                    {field.isDefault
                                      ? " Este é um campo padrão e sua remoção pode afetar o funcionamento do sistema."
                                      : ""}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={handleDeleteField}
                                    className="bg-destructive text-destructive-foreground"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para adicionar/editar campo */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingField ? "Editar Campo" : "Adicionar Novo Campo"}
            </DialogTitle>
            <DialogDescription>
              {editingField
                ? "Modifique as propriedades do campo conforme necessário."
                : "Preencha as informações para adicionar um novo campo ao formulário de produto."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="nome_do_campo"
                className="col-span-3"
                value={editingField ? editingField.name : newField.name}
                onChange={(e) => {
                  if (editingField) {
                    setEditingField({ ...editingField, name: e.target.value });
                  } else {
                    setNewField({ ...newField, name: e.target.value });
                  }
                }}
                disabled={editingField?.isDefault}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Rótulo
              </Label>
              <Input
                id="label"
                placeholder="Rótulo do Campo"
                className="col-span-3"
                value={editingField ? editingField.label : newField.label}
                onChange={(e) => {
                  if (editingField) {
                    setEditingField({ ...editingField, label: e.target.value });
                  } else {
                    setNewField({ ...newField, label: e.target.value });
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                value={editingField ? editingField.type : newField.type}
                onValueChange={(value) => {
                  if (editingField) {
                    setEditingField({ ...editingField, type: value });
                  } else {
                    setNewField({ ...newField, type: value });
                  }
                }}
                disabled={editingField?.isDefault}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="textarea">Área de Texto</SelectItem>
                  <SelectItem value="select">Seleção</SelectItem>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="date">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Obrigatório</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={
                    editingField ? editingField.required : newField.required
                  }
                  onChange={(e) => {
                    if (editingField) {
                      setEditingField({
                        ...editingField,
                        required: e.target.checked,
                      });
                    } else {
                      setNewField({ ...newField, required: e.target.checked });
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="required" className="text-sm font-normal">
                  Campo obrigatório
                </Label>
              </div>
            </div>

            {(editingField?.type === "select" ||
              newField.type === "select") && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="options" className="text-right">
                  Opções
                </Label>
                <Input
                  id="options"
                  placeholder="Opção1, Opção2, Opção3"
                  className="col-span-3"
                  value={editingField?.options?.join(", ") || ""}
                  onChange={(e) => {
                    const options = e.target.value
                      .split(",")
                      .map((opt) => opt.trim())
                      .filter(Boolean);
                    if (editingField) {
                      setEditingField({ ...editingField, options });
                    } else {
                      setNewField({ ...newField, options });
                    }
                  }}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={editingField ? handleUpdateField : handleAddField}>
              {editingField ? "Atualizar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
