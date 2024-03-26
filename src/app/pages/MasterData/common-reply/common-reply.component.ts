import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/MasterServices/master.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-common-reply',
  templateUrl: './common-reply.component.html',
  styleUrls: ['./common-reply.component.css']
})
export class CommonReplyComponent implements OnInit {

  public commonReplyList: any;
  public commonReplyModal: any ={
    commonReply:""
  };

  constructor(
    private masterService: MasterService
  ) { }

  ngOnInit(): void {
    this.loadCommonReplies();
  }

  loadCommonReplies() {
    this.masterService.getCommonReplies().subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          this.commonReplyList = data.CommonReplyList;
        }
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

  public deleteCommonReplyById(commonReplyId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3c8dbc',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.masterService.deleteCommonReply(commonReplyId).subscribe(
          (success) => {
            var data: any;
            data = success;
            if(data.responseStatus === "SUCCESS") {
              Swal.fire(
                'Deleted!',
                data.message,
                'success'
              ).then(() => {
                this.loadCommonReplies();
              });
            }
          },
          (error) => {
            Swal.fire(
              'Failed!',
              'Something went wrong! Contact Administrator',
              'error'
            )
          }
        )
      }
    })
  }

  public addCommonReply() {
    this.masterService.addCommonReply(this.commonReplyModal).subscribe(
      (success) => {
        var data: any;
        data = success;
        if(data.responseStatus === "SUCCESS") {
          Swal.fire(
            'Added!',
            data.message,
            'success'
          ).then(() => {
            this.commonReplyModal.commonReply = "";
            $("#addCommonReplyModal").modal('hide');
            this.loadCommonReplies();
          });
        } else if(data.responseStatus === "FAILURE" && data.errorCode != null) {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          )
          this.commonReplyModal.commonReply = "";
        }
      },
      (error) => {
        Swal.fire(
          'Failed!',
          'Something went wrong! Contact Administrator',
          'error'
        )
      }
    );
  }
  
}
