import { Injectable } from "@nestjs/common";
import { ProjectRepository } from "src/app/repositories/project/project-repository";
import { Project } from "src/app/entities/project/project";

interface UpdateProjectRequest {
    id: string;
    title: string;
    link: string;
    description: string;
    userId: string;
}