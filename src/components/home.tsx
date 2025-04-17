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
          Sistema de Gerenciamento de Produtos
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie seu catálogo de produtos com facilidade
        </p>
      </header>

      <nav className="mb-8 flex gap-4">
        <Link to="/products">
          <Button variant="outline" className="flex items-center gap-2">
            <ListFilter size={18} />
            Listar Produtos
          </Button>
        </Link>
        <Link to="/productform">
          <Button className="flex items-center gap-2">
            <PlusCircle size={18} />
            Cadastrar Produto
          </Button>
        </Link>
        <Link to="/settings">
          <Button variant="outline" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Configurações
          </Button>
        </Link>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Produtos</CardTitle>
            <CardDescription>
              Visão geral do seu catálogo de produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total de Produtos</span>
                <span className="text-xl font-bold">
                  {productSummary.total}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Adicionados esta Semana
                </span>
                <span className="text-xl font-bold">
                  {productSummary.recent}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Pendentes de Revisão
                </span>
                <span className="text-xl font-bold">
                  {productSummary.pending}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/products">
              <Button variant="outline" className="w-full">
                Ver Estatísticas Detalhadas
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Tarefas comuns para gerenciamento de produtos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/productform">
              <Button variant="secondary" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Novo Produto
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary" className="w-full justify-start">
                <ListFilter className="mr-2 h-4 w-4" />
                Navegar Produtos
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="secondary" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Configurações
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas alterações no seu catálogo
            </CardDescription>
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
                    <p className="font-medium">Produto {item} atualizado</p>
                    <p className="text-sm text-muted-foreground">
                      {item === 1
                        ? "Agora mesmo"
                        : item === 2
                          ? "2 horas atrás"
                          : "1 dia atrás"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/products">
              <Button variant="outline" className="w-full">
                Ver Todas as Atividades
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
