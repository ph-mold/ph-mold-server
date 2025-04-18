import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSpec } from './product-spec.entity';

@Entity('spec_types')
export class SpecType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string; // 예: 'ml', 'diameter', 'gauge'

  @Column()
  label: string; // 예: '용량', '지름', '구경'

  @Column()
  unit: string; // 예: 'ml', 'mm'

  @OneToMany(() => ProductSpec, (spec) => spec.specType)
  productSpecs: ProductSpec[];
}
