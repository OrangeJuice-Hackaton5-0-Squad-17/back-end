import { ProjectRepository } from "@app/repositories/project/project-repository";
import { CreateProject, CreateProjectRequest } from "./create-project";
import { TagRepository } from "@app/repositories/tag/tag-repository";
import { ProjectTagRepository } from "@app/repositories/projectTag/projectTag-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { TagProps } from "@app/entities/tag/Tag";


describe('CreateProject', () => {
  let service: CreateProject;
  let mockProjectRepository: ProjectRepository;
  let mockTagRepository: TagRepository;
  let mockProjectTagRepository: ProjectTagRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProject,
        {
          provide: ProjectRepository,
          useValue: {
            create: jest.fn().mockImplementation((project) => Promise.resolve({ ...project, id: 'project-id' })),
          },
        },
        {
          provide: TagRepository,
          useValue: {
            upsert: jest.fn().mockImplementation((opts) => Promise.resolve({ id: 'tag-id', name: opts.create.name, projectTags: [], created_at: new Date() } as TagProps)),
          },
        },
        {
          provide: ProjectTagRepository,
          useValue: {
            create: jest.fn().mockImplementation((projectId, tagId) => Promise.resolve({ projectId, tagId })),
          },
        },
      ],
    }).compile();

    service = module.get<CreateProject>(CreateProject);
    mockProjectRepository = module.get<ProjectRepository>(ProjectRepository);
    mockTagRepository = module.get<TagRepository>(TagRepository);
    mockProjectTagRepository = module.get<ProjectTagRepository>(ProjectTagRepository);
  });

  it('should create a project with tags', async () => {
    const request: CreateProjectRequest = {
      title: 'Sample Project',
      link: 'https://example.com',
      description: 'This is a sample project',
      userId: 'user-id',
      tags: ['tag1', 'tag2'],
    };

    const result = await service.execute(request);

    expect(mockProjectRepository.create).toHaveBeenCalled();
    expect(mockTagRepository.upsert).toHaveBeenCalledTimes(request.tags.length);
    expect(mockProjectTagRepository.create).toHaveBeenCalledTimes(request.tags.length);
    expect(result.project).toBeDefined();
    expect(result.project.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/);
    request.tags.forEach((tag, index) => {
      expect(mockTagRepository.upsert).toHaveBeenCalledWith(expect.objectContaining({ create: { name: tag } }));
    });
  });
});


