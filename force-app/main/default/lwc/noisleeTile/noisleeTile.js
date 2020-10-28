import { LightningElement, api,track } from "lwc";
const TILE_WRAPPER_SELECTED_CLASS = "tile-wrapper selected";
const TILE_WRAPPER_UNSELECTED_CLASS = "tile-wrapper";

export default class NoisleeTile extends LightningElement {
    @api noisleeFileChild;
    @api selectedNoisleeFileId;
    @track imageUrl = "";
    IconState = false;
    @track volumeControl = 0.5;
    audio;
    showVolumeSlider = false;
   // testVariable = 0;

    get backgroundStyle() {
        this.imageUrl = "background-image:url("+this.noisleeFileChild.NoisleeFileRecord__r.Picture__c+")";
        //console.log("this.ImageUrl" + this.imageUrl);
        return this.imageUrl;
      }

      // get tileClass() {
      //   return ((this.selectedNoisleeFileId == this.noisleeFileChild.Id) && (this.IconState))
      //     ? TILE_WRAPPER_SELECTED_CLASS
      //     : TILE_WRAPPER_UNSELECTED_CLASS;
      // }

      get tileClass() {
        return  this.IconState ? TILE_WRAPPER_SELECTED_CLASS : TILE_WRAPPER_UNSELECTED_CLASS;
      }

      handleVolumeChange(event){
        console.log("handleVolumeChange : event.target.value" + event.target.value );
        this.volumeControl = event.target.value/100;
        console.log("handleVolumeChange : this.volumeControl " + this.volumeControl  );
        this.audio.volume = this.volumeControl; 


        
      }

      selectNoisleeFile() {
        //this.selectedNoisleeFileId = !this.selectedNoisleeFileId;
        console.log("tileClass test " + this.selectedNoisleeFileId);
        const noisleefileselect = new CustomEvent("noisleefileselect", {
          detail: {
            noisleeFileId: this.noisleeFileChild.Id
          }
        });
        this.dispatchEvent(noisleefileselect);
        this.playPauseNoisleeFile();
      }

      playPauseNoisleeFile(){
        this.IconState = !this.IconState;
        if (this.IconState == true) {
           // this.testVariable++;
           // console.log("this.testVariable PLAY : " + this.testVariable);
            console.log("this.noisleeFileChild" + this.noisleeFileChild);
            console.log(
                "----------- inside this.noisleeFileChild----------" +
                  JSON.stringify(this.noisleeFileChild, null, "\t")
              );
          this.showVolumeSlider = true;
          this.audio = new Audio(this.noisleeFileChild.NoisleeFileRecord__r.Audio_File_URL__c);
          this.audio.loop = true;
          
          console.log("inside true condition of playPauseNoisleeFile");
          this.audio.volume = this.volumeControl; 
          console.log("inside this.audio.volume " + this.audio.volume);

          this.audio.play();
        } else {
         // this.testVariable--;
         // console.log("this.testVariable PAUSE : " + this.testVariable);
          console.log("inside False condition of playPauseNoisleeFile  ");
          this.showVolumeSlider = false;
          this.audio.pause();
          this.audio.currentTime = 0;
        }
      }



}