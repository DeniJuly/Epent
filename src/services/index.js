import Get from "./get";
import { rootPath } from "./config";
import Post from "./post";

// Event
const GetEvent = () => Get(`${rootPath}events`);
const GetEventById = (id) => Get(`${rootPath}event/${id}`);
const GetEventDisukai = (id) => Get(`${rootPath}event-disukai/${id}`);
const GetEventTerbaru = () => Get(`${rootPath}event-terbaru`);
const GetEventTerpopuler = () => Get(`${rootPath}event-terpopuler`);
const SearchEvent = (key) => Post(`${rootPath}cari`,key);

// Comment
const GetComment = (id) => Get(`${rootPath}comment/${id}`);
const PostComment = (data)  => Post(`${rootPath}comment`,data);

// Like
const GetisLike = (id_event,id_user) => Get(`${rootPath}is-like/${id_event}/${id_user}`);
const GetCountLike = (id) => Get(`${rootPath}like/${id}`);
const AddLike = (data) => Post(`${rootPath}add-like`,data);
const DeleteLike = (data) => Post(`${rootPath}delete-like`,data);

// User
const PostUser = (data) => Post(`${rootPath}daftar`,data);
const Masuk = (data)    => Post(`${rootPath}masuk`,data);
const PostProfile = (data) => Post(`${rootPath}user`,data)

// Kategori
const GetKategori = () => Get(`${rootPath}kategori`);


const API = {
    GetEvent,
    GetEventById,
    GetEventDisukai,
    GetEventTerbaru,
    GetEventTerpopuler,
    GetCountLike,
    SearchEvent,
    GetisLike,
    GetKategori,
    GetComment,
    PostUser,
    PostProfile,
    PostComment,
    AddLike,
    DeleteLike,
    Masuk
}
export default API;