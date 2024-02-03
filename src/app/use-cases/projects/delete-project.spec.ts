import { DeleteProject } from "src/app/use-cases/projects/delete-project"; // Ajuste o caminho do import conforme necessário
import { PrismaService } from 'src/external/database/prisma/prisma.service';
import { ProjectRepository } from 'src/app/repositories/project/project-repository';
import { Project } from "src/app/entities/project/project";

// Mocks fora do escopo para evitar redefinições em múltiplos testes
jest.mock('src/external/database/prisma/prisma.service', () => ({
  $transaction: jest.fn(),
}));
jest.mock('src/app/repositories/project/project-repository', () => ({
  findById: jest.fn(),
}));

describe('DeleteProject', () => {
  let deleteProject: DeleteProject;
  let mockPrismaService: PrismaService;
  let mockProjectRepository: jest.Mocked<ProjectRepository>;

  beforeEach(() => {
    // Simulando o PrismaService com as propriedades necessárias
    mockPrismaService = {
      $transaction: jest.fn().mockImplementation(async (callback) => {
        // Criando um mock para 'prisma' que será usado na transação
        const mockPrisma = {
          projectTag: {
            deleteMany: jest.fn(), // Mock para deleteMany
          },
          project: {
            delete: jest.fn(), // Mock para delete (se necessário)
          },
        };
        return callback(mockPrisma);
      }),
    } as unknown as PrismaService;
  
    // Restante da configuração do beforeEach
    mockProjectRepository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<ProjectRepository>;
  
    deleteProject = new DeleteProject(mockProjectRepository, mockPrismaService);
  });
  

  it('should delete a project and its tags successfully', async () => {
    const projectId = 'some-project-id';
    const mockProject: Partial<Project> = {
      id: projectId,
      title: 'Test Project',
      // Adicione mais propriedades conforme necessário
    };

    mockProjectRepository.findById.mockResolvedValue(mockProject as Project);

    const request = { id: projectId };
    const response = await deleteProject.execute(request);

    expect(mockProjectRepository.findById).toHaveBeenCalledWith(projectId);
    expect(mockPrismaService.$transaction).toHaveBeenCalled();
    // Verificações específicas das chamadas dentro da transação podem ser adicionadas aqui
    expect(response.project).toEqual(mockProject);
  });

  it('should throw an error if the project is not found', async () => {
    const projectId = 'non-existent-project-id';
    mockProjectRepository.findById.mockResolvedValue(null);

    await expect(deleteProject.execute({ id: projectId })).rejects.toThrow('Project not found');

    expect(mockProjectRepository.findById).toHaveBeenCalledWith(projectId);
    // Verificar que a transação não é chamada quando o projeto não é encontrado
    expect(mockPrismaService.$transaction).not.toHaveBeenCalled();
  });

  // Adicione mais testes conforme necessário
});

