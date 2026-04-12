"use client";

interface Step1Props {
  title: string;
  purpose: string;
  benefits: string;
  losses: string;
  errors: Set<string>;
  onTitle: (v: string) => void;
  onPurpose: (v: string) => void;
  onBenefits: (v: string) => void;
  onLosses: (v: string) => void;
}

export function Step1Justification({
  title,
  purpose,
  benefits,
  losses,
  errors,
  onTitle,
  onPurpose,
  onBenefits,
  onLosses,
}: Step1Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium mb-3">Название заявки</p>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Название заявки <span className="text-destructive">*</span>
          </label>
          <input
            className={`input-base ${errors.has("title") ? "border-destructive ring-1 ring-destructive" : ""}`}
            placeholder="Введите название заявки..."
            value={title}
            onChange={(e) => onTitle(e.target.value)}
          />
          {errors.has("title") && (
            <p className="text-xs text-destructive mt-1">Обязательное поле</p>
          )}
        </div>
      </div>

      <div className="border-t border-border/50 pt-6">
        <p className="text-sm font-medium mb-4">Обоснование закупа</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Назначение закупа <span className="text-destructive">*</span>
            </label>
            <textarea
              className={`textarea-base ${errors.has("purpose") ? "border-destructive ring-1 ring-destructive" : ""}`}
              rows={3}
              placeholder="Опишите назначение..."
              value={purpose}
              onChange={(e) => onPurpose(e.target.value)}
            />
            {errors.has("purpose") && (
              <p className="text-xs text-destructive mt-1">Обязательное поле</p>
            )}
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Выгоды от закупа
            </label>
            <textarea
              className="textarea-base"
              rows={3}
              placeholder="Опишите выгоды..."
              value={benefits}
              onChange={(e) => onBenefits(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Убытки при непроведении
            </label>
            <textarea
              className="textarea-base"
              rows={3}
              placeholder="Опишите возможные убытки..."
              value={losses}
              onChange={(e) => onLosses(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
