import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Genre, GenreInput } from '../../../graphql';
import { IContext } from '../../context.model';
import GenresService from '../services/genres.service';

@Resolver('Genre')
export default class GenresResolver {
  private readonly genresService!: GenresService;

  constructor() {
    this.genresService = new GenresService();
  }

  @Query()
  async genre(@Args('id') id: string): Promise<Genre | null> {
    const genre = await this.genresService.findOneById(id);

    return genre;
  }

  @Query()
  async genres(@Args('limit') limit: number, @Args('offset') offset: number): Promise<Genre[]> {
    const genres = await this.genresService.findAll(limit, offset);

    return genres;
  }

  @Mutation()
  async createGenre(@Context() context: IContext, @Args('input') input: GenreInput): Promise<Genre | Error> {
    const { jwt } = context.req.headers;
    const genre = await this.genresService.createGenre(jwt as string, input);

    return genre;
  }

  @Mutation()
  async deleteGenre(@Context() context: IContext, @Args('id') id: string): Promise<string | Error> {
    const { jwt } = context.req.headers;

    const genre = await this.genresService.deleteGenre(jwt as string, id);

    return genre;
  }

  @Mutation()
  async updateGenre(
    @Context() context: IContext,
    @Args('id') id: string,
    @Args('input') input: GenreInput
  ): Promise<Genre | Error> {
    const { jwt } = context.req.headers;
    const genre = await this.genresService.updateGenre(jwt as string, id, input);

    return genre;
  }
}
