import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit {
  resources: T[] = [];

  constructor(protected resourceService: BaseResourceService<T>) {}

  ngOnInit(): void {
    this.resourceService.getAll().subscribe(
      (resources) => (this.resources = resources),
      (error) => console.log('Erro ao carregar a lista')
    );
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => (this.resources = this.resources.filter((e) => e !== resource)),
        () => console.log('Erro ao tentar excluir')
      );
    }
  }
}
