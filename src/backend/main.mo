import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type FilmId = Principal;
  type Film = {
    id : FilmId;
    title : Text;
    description : Text;
    thumbnail : Storage.ExternalBlob;
    video : Storage.ExternalBlob;
  };

  let films = Map.empty<FilmId, Film>();

  public shared ({ caller }) func uploadFilm(title : Text, description : Text, thumbnail : Storage.ExternalBlob, video : Storage.ExternalBlob) : async () {
    if (films.containsKey(caller)) { Runtime.trap("Film with this ID already exists!") };
    let newFilm : Film = {
      id = caller;
      title;
      description;
      thumbnail;
      video;
    };
    films.add(caller, newFilm);
  };

  public query ({ caller }) func getFilm(filmId : FilmId) : async Film {
    switch (films.get(filmId)) {
      case (?film) { film };
      case (null) { Runtime.trap("Film does not exist!") };
    };
  };
};
