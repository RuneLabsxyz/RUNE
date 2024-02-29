<script>
    import { Input } from "$lib/components/ui/input";
    import * as Accordion from "$lib/components/ui/accordion";

    const list = '/svgs/list.svg'
    const apps = '/svgs/apps.svg'
</script>

<div class="flex flex-col h-screen bg-slate-700">


    <!-- Content -->
    <div class="w-full flex-1 flex justify-between text-white">
        <div class="w-1/4 bg-slate-700">
            <div class="flex pt-10 pb-4 px-20 text-2xl uppercase">
                Library
            </div>
            <div class="px-20 text-black">
                <Input type="search" placeholder="Search" />
            </div>
            <div>
                <Accordion.Root class="px-20 py-8">
                    <Accordion.Item value="item-1">
                    <Accordion.Trigger>Filters</Accordion.Trigger>
                    <Accordion.Content
                        >Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content
                    >
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                    <Accordion.Trigger>Installed</Accordion.Trigger>
                    <Accordion.Content>
                        Yes. It comes with default styles that matches the other components'
                        aesthetic.
                    </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item value="item-3">
                    <Accordion.Trigger>Blockchain</Accordion.Trigger>
                    <Accordion.Content>
                        Yes. It's animated by default, but you can disable it if you prefer.
                    </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            </div>
        </div>
        <div class="w-3/4 bg-slate-700 ">
            <div class="flex justify-between item-center border-b py-3 mr-10">
                <div class="flex uppercase text-xl item-center">
                    <div class="pr-14">Featured</div>
                    <div class="pr-14">Favorites</div>
                    <div>Wishlist</div>
                </div>
                <div class="flex item-center">
                    <img src={apps} alt="Company logo" class="h-[30px] px-3">
                    <img src={list} alt="Company logo" class="h-[30px] px-3">
                </div>
            </div>
        </div>
    </div>

</div>