import userStore, {IUserStore} from "@/stores/user.store";
import {action,  makeAutoObservable} from "mobx";
import {ITag, IUITag} from "@/types/checkbox.interface";
import {createTag, deleteTag, getAllTags} from "@/api/tags";

class TagsStore {
    private _tags: IUITag[] = []

    constructor(private userStore: IUserStore) {
        makeAutoObservable(this)
    }

    public get userTags() {
        return this._tags
    }

    public fetchAllTags = action(async () => {
        try {
            const res = await getAllTags()
            if (res) {
                this._tags = res
            }
        } catch (e) {
            console.error(e)
        }
    })


    public createTag = action(async (tag: ITag) => {
        try {
            const res = await createTag({color: tag.color, value: tag.value})
            if (res) {
                this._tags.push(res)
            } else {
                this._tags.push({...tag, isError: true, isLoading: false});
            }
        } catch (e) {
            console.log(e)
        }
    })

    public retryAddTag = action(async (badTag: IUITag) => {
        this._tags = this._tags.filter(t => t.id !== badTag.id)

        await this.createTag({
            id: badTag.id,
            value: badTag.value,
            color: badTag.color
        })
    })

    public deleteTag = action(async (id: string, isError?: boolean) => {
        const _t = [...this._tags]

        // оптимистичное удаление
        this._tags = this._tags.filter(t => t.id !== id)

        if (isError) return

        const deletedId = await deleteTag(id)
        // если не получилось удалить
        if (!deletedId) this._tags = [..._t]

    })

}

const tagsStore = new TagsStore(userStore)
export default tagsStore;