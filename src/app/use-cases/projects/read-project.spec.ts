import { GetProjectById, ReadProjectsRequest } from 'src/app/use-cases/projects/read-project';
import { ProjectRepository } from 'src/app/repositories/project/project-repository';
import { Project } from 'src/app/entities/project/project';

describe('GetProjectById', () => {
  let getProjectById: GetProjectById;
  let mockProjectRepository: Partial<ProjectRepository>;

  beforeEach(() => {
    mockProjectRepository = {
      findById: jest.fn().mockResolvedValue(undefined),
    };

    getProjectById = new GetProjectById(mockProjectRepository as ProjectRepository);
  });

  it('should return a project for a valid ID', async () => {
    const projectID = 'some-project-id';
    const expectedProject: Partial<Project> = {
      id: projectID,
      title: 'Test Project'
    };

    (mockProjectRepository.findById as jest.Mock).mockResolvedValue(expectedProject as Project);

    const request: ReadProjectsRequest = { id: projectID };
    const response = await getProjectById.execute(request);

    expect(mockProjectRepository.findById).toHaveBeenCalledWith(projectID);

    expect(response.projects).toEqual(expectedProject);
  });

});
