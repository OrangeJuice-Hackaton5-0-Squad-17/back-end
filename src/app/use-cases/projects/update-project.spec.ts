import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProject } from './update-project';
import { ProjectRepository } from 'src/app/repositories/project/project-repository';
import { TagRepository } from 'src/app/repositories/tag/tag-repository';
import { ProjectTagRepository } from 'src/app/repositories/projectTag/projectTag-repository';
import { Project } from 'src/app/entities/project/project';
import { Tag } from 'src/app/entities/tag/tag';



describe('UpdateProject', () => {
  let service: UpdateProject;
  let mockProjectRepository: ProjectRepository;
  let mockTagRepository: TagRepository;
  let mockProjectTagRepository: ProjectTagRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProject,
        {
          provide: ProjectRepository,
          useValue: {
            update: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: TagRepository,
          useValue: {
            findUnique: jest.fn().mockImplementation((tagName) => {
              const tag = new Tag({ name: tagName, projectTags: [], created_at: new Date() });
              // Aqui, você simula o comportamento de definição do ID como se fosse feito internamente pela Tag.
              // Esta é uma maneira de contornar a impossibilidade de definir o ID diretamente.
              Object.defineProperty(tag, 'id', {
                value: 'tag-id',
                writable: false,
              });
              return Promise.resolve(tag);
            }),
            create: jest.fn().mockImplementation((tagName) => {
              const tag = new Tag({ name: tagName, projectTags: [], created_at: new Date() });
              Object.defineProperty(tag, 'id', {
                value: 'tag-id',
                writable: false,
              });
              return Promise.resolve(tag);
            }),
          },
        }
        ,
        {
          provide: ProjectTagRepository,
          useValue: {
            deleteMany: jest.fn().mockResolvedValue(undefined),
            create: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateProject>(UpdateProject);
    mockProjectRepository = module.get<ProjectRepository>(ProjectRepository);
    mockTagRepository = module.get<TagRepository>(TagRepository);
    mockProjectTagRepository = module.get<ProjectTagRepository>(ProjectTagRepository);
  });

  it('should update a project with new tags', async () => {
    const request = {
      id: 'project-id',
      title: 'Updated Project',
      link: 'https://example.com/updated',
      description: 'This is an updated project description',
      userId: 'user-id',
      tags: ['updatedTag1', 'updatedTag2'],
    };

    await service.execute(request);

    expect(mockProjectRepository.update).toHaveBeenCalledWith(expect.any(Project));
    expect(mockProjectTagRepository.deleteMany).toHaveBeenCalledWith(request.id);
    expect(mockTagRepository.findUnique).toHaveBeenCalledTimes(request.tags.length);
    expect(mockProjectTagRepository.create).toHaveBeenCalledTimes(request.tags.length);
    // Você pode adicionar mais expectativas aqui para verificar a lógica específica do seu teste
  });
});
