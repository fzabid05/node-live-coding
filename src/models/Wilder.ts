import { prop, getModelForClass } from '@typegoose/typegoose';

type Skill = {
  title: string;
  voteCount: number;
};

class Wilder {
  @prop({ required: true, unique: true })
  public name: string;

  @prop()
  public city: string;

  @prop()
  public skills: Skill[];
}

export default getModelForClass(Wilder);
