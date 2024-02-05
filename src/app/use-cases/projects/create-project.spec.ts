import { Test, TestingModule } from '@nestjs/testing';
import { CreateProject, CreateProjectRequest } from './create-project';
import { TagRepository } from 'src/app/repositories/tag/tag-repository';
import { ProjectRepository } from 'src/app/repositories/project/project-repository';
import { ProjectTagRepository } from 'src/app/repositories/projectTag/projectTag-repository';
import { Project } from 'src/app/entities/project/project';
import { Tag, TagProps } from 'src/app/entities/tag/tag';

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


// import { Test, TestingModule } from '@nestjs/testing';
// import { CreateProject } from './create-project';
// import { ProjectRepository } from 'src/app/repositories/project/project-repository';
// import { TagRepository } from 'src/app/repositories/tag/tag-repository';
// import { ProjectTagRepository } from 'src/app/repositories/projectTag/projectTag-repository';
// import { Project } from 'src/app/entities/project/project';
// import { Tag } from 'src/app/entities/tag/tag';
// import { TagProps } from 'src/app/entities/tag/tag'; // Import the TagProps type

// describe('CreateProject', () => {
//   let createProject: CreateProject;
//   let projectRepository: ProjectRepository;
//   let tagRepository: TagRepository;
//   let projectTagRepository: ProjectTagRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CreateProject,
//         {
//           provide: ProjectRepository,
//           useValue: {
//             create: jest.fn(),
//           },
//         },
//         {
//           provide: TagRepository,
//           useValue: {
//             upsert: jest.fn(),
//           },
//         },
//         {
//           provide: ProjectTagRepository,
//           useValue: {
//             create: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     createProject = module.get<CreateProject>(CreateProject);
//     projectRepository = module.get<ProjectRepository>(ProjectRepository);
//     tagRepository = module.get<TagRepository>(TagRepository);
//     projectTagRepository =
//       module.get<ProjectTagRepository>(ProjectTagRepository);
//   });

//   it('should create a project with tags', async () => {
//     const request = {
//       title: 'Sample Project',
//       link: 'https://example.com',
//       description: 'This is a sample project',
//       userId: '123',
//       tags: ['tag1', 'tag2'],
//     };

//     const project = new Project({
//       title: request.title,
//       link: request.link,
//       description: request.description,
//       userId: request.userId,
//       user: null,
//       tags: [],
//       projectTags: [],
//       created_at: expect.any(Date),
//       updated_at: null,
//     });

//     const tag1 = new Tag({ id: 'tag1', name: 'tag1', projectTags: [], created_at: expect.any(Date) } as TagProps);
//     const tag2 = new Tag({ id: 'tag2', name: 'tag2', projectTags: [], created_at: expect.any(Date) } as TagProps);

//     jest.spyOn(projectRepository, 'create').mockResolvedValueOnce();
//     jest
//       .spyOn(tagRepository, 'upsert')
//       .mockResolvedValueOnce(tag1)
//       .mockResolvedValueOnce(tag2);
//     jest.spyOn(projectTagRepository, 'create').mockResolvedValueOnce();

//     const result = await createProject.execute(request);

//     expect(projectRepository.create).toHaveBeenCalledWith(project);
//     expect(tagRepository.upsert).toHaveBeenCalledWith({
//       where: { name: 'tag1' },
//       update: {},
//       create: { name: 'tag1' },
//     });
//     expect(tagRepository.upsert).toHaveBeenCalledWith({
//       where: { name: 'tag2' },
//       update: {},
//       create: { name: 'tag2' },
//     });
//     expect(projectTagRepository.create).toHaveBeenCalledWith(
//       project.id,
//       tag1.id,
//     );
//     expect(projectTagRepository.create).toHaveBeenCalledWith(
//       project.id,
//       tag2.id,
//     );
//     expect(result).toEqual({ project });
//   });
// });
