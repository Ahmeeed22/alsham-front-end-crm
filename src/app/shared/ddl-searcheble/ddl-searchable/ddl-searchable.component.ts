import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FilterObject, Item } from '../models/item';
import { DdlSearchableService } from '../ddl-searchable.service';
import { TranslateService } from '@ngx-translate/core';
// import * as global from 'src/app/config/global';
import { environment } from 'src/environments/environment';
// import { PicturepathPipe } from '../../pic-pipes/picturepath.pipe';

@Component({
  selector: 'app-ddl-searchable',
  templateUrl: './ddl-searchable.component.html',
  styleUrls: ['./ddl-searchable.component.scss'],
})
/**
 * Class representing a searchabel drop down list control.
 */
export class DdlSearchableComponent implements OnChanges {

  multiSelectForm: FormGroup = new FormGroup({});
  /**
   * filter object coming from every parent
   * @type {any[] }
   */
  @Input() filterObj : FilterObject={ limit : 0,
    offset :0,
    search :'',
    country_id:null}
  /**
   * message error
   * @type string
   */
  messageError?: string;
  /**
   * object data coming from parent
   * @type {Item}
   */
  @Input() objData: Item = {};
  /**
   * element reference to parent dev of ddl
   * @type {ElementRef}
   */
  /**
   * element reference of placeholder span
   * @type {ElementRef}
   */
  @ViewChild('label') label!: ElementRef;

  @ViewChild('ddl') ddl !: ElementRef;
  /**
   * element reference to span that display selected items
   * @type {ElementRef}
   */
  @ViewChild('valueTextSpan') valueTextSpan !: ElementRef;
  /**
   * element reference to icon toggle
   * @type {ElementRef}
   */
  @ViewChild('iconToggle') iconToggle !: ElementRef;
  /**
   * element reference to span that display selected items
   */
  @Output() ourEvent = new EventEmitter();
  /**
   * comma specail char
   * @type {string}
   */
  comma: string = ' , ';
  /**
   * space
   * @type {string}
   */
  space: string = ' ';
  /**
   * list item to list it at ddl options
   * @type {any[] }
   */
  listItems: any[] = [];
  /**
   * input search
   * @type { string }
   */
  searchInput : any;
  /**
   * flage to control dispay and heddin the ddl
   * @type { boolean }
   */
  showDDL: boolean = false;
  /**
   * list of old and final selected items
   * @type { any[] } }
   */
  oldselectedItems: any[] = [];
  /**
   * flage to control style border of ddl in validation
   * @type { boolean }
   */
  borderError: boolean = false;
  /**
   * img base url coming from global
   * @type { string }
   */
  // imageBaseUrl: string = environment.s3PublicUrl;

  /**
   * @constructor
   * @param {DdlSearchableService} _DdlSearchableService - The DdlSearchableService service.
   * @param {TranslateService} translate - The TranslateService service.
   * @param {ElementRef} eRef - The ElementRef coming from angular core
   */
  constructor(
    private _DdlSearchableService: DdlSearchableService,
    // public translate: TranslateService,
    private eRef: ElementRef,
    // public picturepathPipe: PicturepathPipe
  ) {}

  ngOnInit() {

  }
  /**
   * get list item at first and drowing old item selected
   * @public
   */
  ngOnChanges(): void {
    // to case get update data at child
    // let oldSelected = [];
    // if (this.objData.apiPathUpdate) {
    //   this._DdlSearchableService
    //     .getListItems(this.objData.apiPathUpdate, {})
    //     .subscribe((res: any) => {
    //       oldSelected = res.data.rows;

    //       if (!this.objData.multiSelect) {
    //         if (oldSelected.length) {
    //           this.oldselectedItems = this.objData.subContent
    //             ? [oldSelected[0][this.objData.subContent]]
    //             : [oldSelected[0]];
    //           this.displaySelectedItemsInInput();
    //         }
    //       } else {
    //         for (let w = 0; w < oldSelected.length; w++) {
    //           this.oldselectedItems.push(
    //             this.objData.subContent
    //               ? oldSelected[w][this.objData.subContent]
    //               : oldSelected[w]
    //           );
    //         }
    //       }
    //     });
    // }

    // in case passing updating data from parent
    if (this.objData?.oldSelectedItems) {
      this.oldselectedItems = Array.isArray(this.objData.oldSelectedItems)
        ? this.objData.oldSelectedItems
        : [this.objData.oldSelectedItems];
    }
    this.listItems = []
    this.multiSelectForm = new FormGroup({})
    this.getAllListItems();
  }

  /**
   * get list item add add checked prob to old selected items
   * @public
   */
  getAllListItems() {
    if (this.objData.apiPath) {
      this._DdlSearchableService
        .getListItems(this.objData.apiPath, this.filterObj)
        .subscribe((res: any) => {
          // for case update multiSelect Case
          if (this.objData.multiSelect) {
            for (let i = 0; i < res.data.rows.length; i++) {
              for (let y = 0; y < this.oldselectedItems.length; y++) {
                if (res.data.rows[i].id == this.oldselectedItems[y].id) {
                  res.data.rows[i].checked = true;
                  this.add(res.data.rows[i], this.oldselectedItems);
                }
              }
            }
          }
          this.patchValueToForm(res.data.rows)
          this.listItems.push(...res.data.rows);
        });
    }

    if (this.objData.staticArray) {
      if (this.objData.multiSelect) {
        for (let i = 0; i < this.objData.staticArray.length; i++) {
          for (let y = 0; y < this.oldselectedItems.length; y++) {
            if (this.objData.staticArray[i].id == this.oldselectedItems[y].id) {
              this.objData.staticArray[i].checked = true;
              this.add(this.objData.staticArray[i], this.oldselectedItems);
            }
          }
        }
      }
      if(this.listItems.length===0){
        this.patchValueToForm(this.objData.staticArray)
        this.listItems = [...this.objData.staticArray];
      }
    }
  }
  /**
   * select item from list option and add it to old selected items list
   * @param {any} event : event fire at all selected event and pass at this event the selected item
   * @param {any} item : Item selected
   * @public
   */
  selectItem(event: any, item: any) {
    if (!this.objData.multiSelect) {
      this.showDDL = !this.showDDL;
      this.oldselectedItems = [item];
    } else {
      if (event.target.checked) {
        this.oldselectedItems.push(item);
      } else {
        this.oldselectedItems = this.oldselectedItems.filter((obj) => {
          return obj.id !== item.id;
        });
      }
    }
    // fire action when select action
    this.ourEvent.emit(this.gettingResult());
    this.validate();
    event.stopPropagation();
  }

  /**
   * pagination function calling at scroll event by increament the offset at filter object by one
   * @param {any} event : to get from it target information as offsetHeight ,scrollTop to pagination
   * @public
   */
  paginationScroll(event: any) {
    if (
      Math.ceil(event.target.offsetHeight + event.target.scrollTop) >=
      event.target.scrollHeight
    ) {
      if (this.filterObj && (this.filterObj.offset || this.filterObj.offset == 0)) {
        this.filterObj.offset++;
        this.getAllListItems();
      }
    }
  }
  /**
   * search by the input text adding search prob to filter object and call getAllListItems again
   * @public
   */
  search() {
    this.listItems = [];
    this.filterObj.offset = 0;
    if (this.searchInput.trim() != '') {
      for (let index = 0; index < this.objData.staticArray.length; index++) {
        if (this.objData.staticArray[index].name.toLowerCase().includes(this.searchInput.toLowerCase())) {
           this.listItems.push(this.objData.staticArray[index])
        }
        // this.objData.staticArray
        
    }
      
      this.filterObj.search = this.searchInput;
    } else {
      if (this.filterObj.search) delete this.filterObj.search;
      this.listItems=[...this.objData.staticArray]
      this.getAllListItems();
    }
   this.objData.staticArray.length ? '':  this.getAllListItems();
  }
  /**
   * adding new list to parentList withOut dublicate
   * @param {{}} element : element that added to list without deplicated
   * @param {any[]} listParent : the parent list
   * @public
   */
  add(element: any, listParent: any) {
    if (listParent.filter((x:any) => x.id === element.id).length === 0) {
      listParent.push(element);
    }
  }

  /**
   * check the click out side or no and fire validation function and control show the searchable ddl
   * @param {any} event : to get from it target information as offsetHeight
   * @return {boolean}
   * @private
   */
  private isClickOutside(event: MouseEvent): boolean {
    return !this.eRef.nativeElement.contains(event.target);
  }

  /**
   * check the click out side or no and fire validation function and control show the searchable ddl
   * @param {any} event : to get from it target information as offsetHeight
   * @public
   */
  /** */
  @HostListener('click', ['$event'])
  clickInside(event: MouseEvent) {
    if (
      event.target == this.ddl?.nativeElement ||
      event.target == this.label?.nativeElement ||
      event.target == this.valueTextSpan?.nativeElement ||
      (this.valueTextSpan && [...this.valueTextSpan?.nativeElement.children].includes(event.target)) ||
      event.target == this.iconToggle?.nativeElement
    ) {
      this.showDDL = !this.showDDL;
      if (this.filterObj && this.filterObj.offset) this.filterObj.offset = this.filterObj.offset;
      if (!this.showDDL) {
        this.validate();
      }
    }
  }

  /**
   * check the click out side or no and fire validation function
   * @param {any} event : to get from it target information as offsetHeight ,scrollTop to pagination
   * @public
   */
  @HostListener('document:click', ['$event'])
  clickOutside(event:any) {
    if (this.showDDL && this.isClickOutside(event)) {
      this.showDDL = false;
      this.validate();
    }
  }

  /**
   * validate the ddl searchable inputs and change the style border color
   * @public
   */
  validate():any {
    if (this.objData.required) {
      if (this.oldselectedItems?.length > 0) {
        this.borderError = false;
        return true
      } else {
        this.borderError = true;
        this.messageError = this.objData.messageErrorRequiredEn
        return false
      }
    }
  }
  /**
   * getting final selected items if single selected return object and if multi return array of objectsnt
   * @public
   * @return {any[] | {}}
   */
  gettingResult(): any {
    return this.objData.multiSelect
      ? this.oldselectedItems
      : this.oldselectedItems[0];
  }

  checkOnClickOnEntireRow(id: number, item: any, event: Event) {
    // id + item.name (for a unique id)
    if ((event.target as HTMLElement).tagName !== "INPUT") {
      (document.getElementById(id + item.nameEn)?.children[0] as any).click();
    }
  }
  list: any;
  resetList() {
    this.oldselectedItems = []
    this.searchInput = ""
    if (this.objData.multiSelect) {
      this.multiSelectForm.reset()
      this.ourEvent.emit(this.gettingResult());
    }
    else {
      this.oldselectedItems=[]
      this.ourEvent.emit({ id: undefined });
    }
  }
  patchValueToForm(myListITems:any) {
    myListITems.map((item:any) => {
      this.multiSelectForm.addControl(item.id + item.nameEn, new FormControl(item.checked))
    })
  }
}
