import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note)
        private noteRepository: Repository<Note>,
    ) {}

    async findAll(): Promise<Note[]> {
        return await this.noteRepository.find();
    }

    async create(nota: Note): Promise<Note> {
        return await this.noteRepository.save(nota);
    }

    async findOne(id: number): Promise<Note> {
        const note = await this.noteRepository.findOneBy({id});
        if (!note) {
            throw new Error(`Note with id ${id} not found`);
        }
        return note;
    }

    async update(id: number, note: Partial<Note>): Promise<Note> {
        const before = await this.findOne(id);
        if(before) {
            if(!note.title) {
                note.title = before.title;
            }

            if(!note.content) {
                note.content = before.content;
            }
        }
        await this.noteRepository.update({id}, note);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.noteRepository.delete({id});
    }
}
