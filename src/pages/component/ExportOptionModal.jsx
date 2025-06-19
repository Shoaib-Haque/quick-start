import Button from "./Button";
import Modal from "./Modal";

export default function ExportOptionModal({
  isOpen,
  isBusy,
  onClose,
  onExport,
  hasSelectedItems = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      headline="Export Options"
      isButtonDisable={isBusy}
    >
      <div className="flex flex-col gap-3">
        <Button
          text="Export Search Results"
          ariaLabel="Export Search Results"
          onButtonClick={() => onExport("search")}
          isButtonDisable={isBusy}
        />
        <Button
          text="Export Current Page"
          ariaLabel="Export Current Page"
          onButtonClick={() => onExport("page")}
          isButtonDisable={isBusy}
        />
        <Button
          text="Export Selected Items"
          title={!hasSelectedItems ? 'Select to Export' : ''}
          ariaLabel="Export Selected Items"
          onButtonClick={() => onExport("selected")}
          isButtonDisable={isBusy || !hasSelectedItems}
        />
      </div>
    </Modal>
  );
}