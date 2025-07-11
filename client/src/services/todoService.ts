const API_BASE_URL = 'http://localhost:3001/api';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

class TodoService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getAllTodos(): Promise<Todo[]> {
    const response: ApiResponse<Todo[]> = await this.makeRequest('/todos');
    return response.data;
  }

  async getTodoById(id: number): Promise<Todo> {
    const response: ApiResponse<Todo> = await this.makeRequest(`/todos/${id}`);
    return response.data;
  }

  async createTodo(text: string): Promise<Todo> {
    const response: ApiResponse<Todo> = await this.makeRequest('/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
    return response.data;
  }

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    const response: ApiResponse<Todo> = await this.makeRequest(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return response.data;
  }

  async toggleTodo(id: number): Promise<Todo> {
    const response: ApiResponse<Todo> = await this.makeRequest(`/todos/${id}/toggle`, {
      method: 'PATCH',
    });
    return response.data;
  }

  async deleteTodo(id: number): Promise<void> {
    await this.makeRequest(`/todos/${id}`, {
      method: 'DELETE',
    });
  }
}

export const todoService = new TodoService(); 