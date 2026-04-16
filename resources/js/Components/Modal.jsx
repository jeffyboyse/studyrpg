// Importerar nödvändiga komponenter från Headless UI.
// Dessa gör det enkelt att bygga tillgängliga och animerade dialogrutor.
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';

// Exporterar Modal-komponenten så att den kan användas i andra filer.
// Komponenten tar emot flera "props" (inställningar) med standardvärden (default-värden).
export default function Modal({
    children, // Innehållet som ska visas inuti modalen (t.ex. text eller formulär).
    show = false, // Styr om modalen ska synas eller inte (standard är dold).
    maxWidth = '2xl', // Bestämmer hur bred modalen får bli som max.
    closeable = true, // Styr om användaren får stänga modalen (genom att klicka utanför/trycka på Esc).
    onClose = () => {}, // En funktion som körs när modalen stängs.
}) {
    
    // En intern funktion som anropas när modalen försöker stängas.
    const close = () => {
        // Om 'closeable' är sant, tillåter vi att 'onClose'-funktionen körs.
        if (closeable) {
            onClose();
        }
    };

    // Ett "lexikon" (objekt) som översätter vår 'maxWidth'-prop till riktiga Tailwind CSS-klasser.
    // Om vi skickar in maxWidth="md", ger den oss klassen "sm:max-w-md".
    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        // Transition hanterar att modalen animeras smidigt in och ut.
        // Den lyssnar på vår 'show'-prop för att veta när den ska starta.
        <Transition show={show} leave="duration-200">
            
            {/* Dialog är huvudbehållaren för hela rutan. Den tar över skärmen. */}
            <Dialog
                as="div"
                id="modal"
                // Tailwind-klasser som gör att modalen ligger fast över hela skärmen (fixed inset-0)
                // med högsta prioritet (z-50) och centrerar innehållet.
                className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0"
                // Säger åt Dialog att köra vår close-funktion om man trycker Esc eller klickar utanför rutan.
                onClose={close}
            >
                {/* Första TransitionChild: Detta är bakgrunden (Backdrop). 
                    Den mörkar ner resten av hemsidan när modalen är öppen.
                */}
                <TransitionChild
                    enter="ease-out duration-300" // Animering när den öppnas (mjuk och tar 300 millisekunder).
                    enterFrom="opacity-0"         // Startar helt genomskinlig...
                    enterTo="opacity-100"       // ...och slutar helt synlig.
                    leave="ease-in duration-200"  // Animering när den stängs (snabbare, 200ms).
                    leaveFrom="opacity-100"       // Börjar synlig...
                    leaveTo="opacity-0"           // ...och tonas bort.
                >
                    {/* Själva den gråa bakgrunden med 75% transparens */}
                    <div className="absolute inset-0 bg-gray-500/75" />
                </TransitionChild>

                {/* Andra TransitionChild: Detta är själva den vita rutan med innehållet.
                    Den har en mer avancerad animering där den både tonas in och åker upp/växer lite (translate/scale).
                */}
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" // Börjar lite längre ner och något mindre.
                    enterTo="opacity-100 translate-y-0 sm:scale-100"                 // Hamnar på sin riktiga plats i full storlek.
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    {/* DialogPanel är behållaren för själva rutan där innehållet sitter.
                        Här lägger vi till vit bakgrund (bg-white), rundade hörn (rounded-lg), 
                        skugga (shadow-xl) och slår ihop den med vår valda bredd (maxWidthClass).
                    */}
                    <DialogPanel
                        className={`mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full ${maxWidthClass}`}
                    >
                        {/* Här inuti renderas det innehåll du stoppar in i modalen (t.ex. texten du vill visa) */}
                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}