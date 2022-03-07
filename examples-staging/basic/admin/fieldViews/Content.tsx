/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, useTheme } from '@keystone-ui/core';
import { InfoIcon } from '@keystone-ui/icons/icons/InfoIcon';
import { AlertTriangleIcon } from '@keystone-ui/icons/icons/AlertTriangleIcon';
import { AlertOctagonIcon } from '@keystone-ui/icons/icons/AlertOctagonIcon';
import { CheckCircleIcon } from '@keystone-ui/icons/icons/CheckCircleIcon';
import { Trash2Icon } from '@keystone-ui/icons/icons/Trash2Icon';
import { Tooltip } from '@keystone-ui/tooltip';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@keystone-6/fields-document/primitives';
import { useEffect } from 'react';
import { Button } from '@keystone-ui/button';

const noticeIconMap = {
  info: InfoIcon,
  error: AlertOctagonIcon,
  warning: AlertTriangleIcon,
  success: CheckCircleIcon,
};

export const componentBlocks = {
  // yellowBackgroundDivider: component({
  //   component: () => <NotEditable>Yellow Divider</NotEditable>,
  //   props: {},
  //   label: 'Yellow Background Divider',
  // }),
  // button: component({
  //   component: props => {
  //     return <div>{props.content}</div>;
  //   },
  //   props: {
  //     content: fields.child({ kind: 'inline', placeholder: 'Content' }),
  //   },
  //   label: 'Button',
  // }),
  // modalButton: component({
  //   component: function ModalThing(props) {
  //     const [isOpen, setIsOpen] = useState(false);
  //     return (
  //       <div>
  //         {props.buttonContent}
  //         <div>
  //           <NotEditable>
  //             <button
  //               onClick={() => {
  //                 setIsOpen(x => !x);
  //               }}
  //             >
  //               Toggle Modal
  //             </button>
  //           </NotEditable>
  //         </div>
  //         <div style={{ display: isOpen ? 'block' : 'none' }}>
  //           <NotEditable>
  //             <h1>Modal Content</h1>
  //           </NotEditable>
  //           {props.modalContent}
  //         </div>
  //       </div>
  //     );
  //   },
  //   props: {
  //     buttonContent: fields.child({ kind: 'inline', placeholder: 'Content' }),
  //     modalContent: fields.child({ kind: 'block', placeholder: 'Content' }),
  //   },
  //   label: 'Modal Button',
  // }),
  thing: component({
    component: props => {
      return (
        <div>
          <h1>{props.heading}</h1>
          <NotEditable>
            <h1>{props.icon.value}</h1>
          </NotEditable>
          <div>{props.content}</div>
        </div>
      );
    },
    props: {
      heading: fields.child({ kind: 'inline', placeholder: 'Heading' }),
      icon: fields.select({
        label: 'Icon',
        options: [{ label: 'A', value: 'a' }],
        defaultValue: 'a',
      }),
      content: fields.child({ kind: 'block', placeholder: 'Content' }),
    },
    label: 'thing',
  }),
  table: component({
    component: function MyTable({ rows }) {
      // useEffect(() => {
      //   let maxColumns = 1;
      //   for (const row of rows.elements) {
      //     if (row.elements.length > maxColumns) {
      //       maxColumns = row.elements.length;
      //     }
      //   }
      //   for (const columns of rows.elements) {
      //     for (const _ of Array.from({ length: maxColumns - columns.elements.length })) {
      //       columns.insert();
      //     }
      //   }
      // });

      return (
        <div>
          <table css={{ width: '100%' }}>
            <tbody>
              {rows.elements.map((row, i) => {
                return (
                  <tr key={i} css={{ border: '1px solid black' }}>
                    {row.element.elements.map((column, i) => {
                      return (
                        <td key={i} css={{ border: '1px solid black' }}>
                          {column.element.content}
                        </td>
                      );
                    })}
                    <NotEditable>
                      <Button
                        onClick={() => {
                          row.element.onInsert();
                        }}
                      >
                        Insert Column
                      </Button>
                    </NotEditable>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <NotEditable>
            <div
              onClick={() => {
                rows.onInsert();
              }}
            >
              <Button>Insert row</Button>
            </div>
          </NotEditable>
        </div>
      );
    },
    label: 'Table',
    props: {
      rows: fields.array(
        fields.array(
          fields.object({
            content: fields.child({ kind: 'block', placeholder: '' }),
          })
        )
      ),
      headers: fields.object({
        row: fields.checkbox({ label: 'Header Row' }),
        column: fields.checkbox({ label: 'Header Column' }),
      }),
    },
  }),
  myList: component({
    component: function MyList({ children }) {
      useEffect(() => {
        if (!children.elements.length) {
          children.onInsert();
        }
      });
      return (
        <div>
          <ul css={{ padding: 0 }}>
            {children.elements.map((element, i) => (
              <li css={{ listStyle: 'none' }} key={element.id}>
                <input
                  contentEditable="false"
                  css={{ marginRight: 8 }}
                  type="checkbox"
                  checked={element.element.done.value}
                  onChange={event => element.element.done.onChange(event.target.checked)}
                />
                <span
                  style={{
                    textDecoration: element.element.done.value ? 'line-through' : undefined,
                  }}
                >
                  {element.element.content}
                </span>
              </li>
            ))}
          </ul>
          <NotEditable>
            <Button
              onClick={() => {
                children.onInsert();
              }}
            >
              Add
            </Button>
          </NotEditable>
        </div>
      );
    },
    label: 'My List',
    props: {
      children: fields.array(
        fields.object({
          done: fields.checkbox({ label: 'Done' }),
          content: fields.child({ kind: 'inline', placeholder: '', formatting: 'inherit' }),
        })
      ),
    },
    chromeless: true,
  }),
  hero: component({
    component: props => {
      return (
        <div
          css={{
            backgroundColor: 'white',
            backgroundImage: `url(${props.imageSrc.value})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column',
            fontSize: 28,
            justifyContent: 'space-between',
            minHeight: 200,
            padding: 16,
            width: '100%',
          }}
        >
          <div
            css={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 48,
              textAlign: 'center',
              margin: 16,
              textShadow: '0px 1px 3px black',
            }}
          >
            {props.title}
          </div>
          <div
            css={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              margin: 16,
              textAlign: 'center',
              textShadow: '0px 1px 3px black',
            }}
          >
            {props.content}
          </div>
          {props.cta.discriminant ? (
            <div
              css={{
                backgroundColor: '#F9BF12',
                borderRadius: 6,
                color: '#002B55',
                display: 'inline-block',
                fontSize: 16,
                fontWeight: 'bold',
                margin: '16px auto',
                padding: '12px 16px',
              }}
            >
              {props.cta.value.text}
            </div>
          ) : null}
        </div>
      );
    },
    label: 'Hero',
    props: {
      title: fields.child({ kind: 'inline', placeholder: 'Title...' }),
      content: fields.child({ kind: 'block', placeholder: '...' }),
      imageSrc: fields.text({
        label: 'Image URL',
        defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      }),
      cta: fields.conditional(fields.checkbox({ label: 'Show CTA' }), {
        false: fields.empty(),
        true: fields.object({
          text: fields.child({ kind: 'inline', placeholder: 'CTA...' }),
          href: fields.url({ label: 'Call to action link' }),
        }),
      }),
    },
  }),
  void: component({
    label: 'Void',
    component: ({ value }) => <NotEditable>{value.value}</NotEditable>,
    props: { value: fields.text({ label: 'Value' }) },
  }),
  conditionallyVoid: component({
    label: 'Conditionally Void',
    component: ({ something }) =>
      something.discriminant ? <NotEditable>Is void</NotEditable> : <div>{something.value}</div>,
    props: {
      something: fields.conditional(fields.checkbox({ label: 'Is void' }), {
        false: fields.child({ kind: 'inline', placeholder: '...' }),
        true: fields.empty(),
      }),
    },
  }),
  featuredAuthors: component({
    label: 'Featured Authors',
    component: props => {
      return (
        <div>
          <h1>{props.title}</h1>
          <NotEditable>
            <ul>
              {props.authors.value.map((author, i) => {
                return (
                  <li key={i}>
                    {author.label}
                    <ul>
                      {author.data.posts.map((post: { title: string | null }, i: number) => {
                        return <li key={i}>{post.title}</li>;
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </NotEditable>
        </div>
      );
    },
    props: {
      title: fields.child({ kind: 'inline', placeholder: 'Title...' }),
      authors: fields.relationship({
        label: 'Authors',
        listKey: 'User',
        many: true,
        selection: `posts(take: 10) { title }`,
      }),
    },
  }),
  notice: component({
    component: function Notice({ content, intent }) {
      const { palette, radii, spacing } = useTheme();
      const intentMap = {
        info: {
          background: palette.blue100,
          foreground: palette.blue700,
          icon: noticeIconMap.info,
        },
        error: {
          background: palette.red100,
          foreground: palette.red700,
          icon: noticeIconMap.error,
        },
        warning: {
          background: palette.yellow100,
          foreground: palette.yellow700,
          icon: noticeIconMap.warning,
        },
        success: {
          background: palette.green100,
          foreground: palette.green700,
          icon: noticeIconMap.success,
        },
      };
      const intentConfig = intentMap[intent.value];

      return (
        <div
          css={{
            borderRadius: radii.small,
            display: 'flex',
            paddingLeft: spacing.medium,
            paddingRight: spacing.medium,
          }}
          style={{
            background: intentConfig.background,
          }}
        >
          <NotEditable>
            <div
              css={{
                color: intentConfig.foreground,
                marginRight: spacing.small,
                marginTop: '1em',
              }}
            >
              <intentConfig.icon />
            </div>
          </NotEditable>
          <div css={{ flex: 1 }}>{content}</div>
        </div>
      );
    },
    label: 'Notice',
    chromeless: true,
    props: {
      intent: fields.select({
        label: 'Intent',
        options: [
          { value: 'info', label: 'Info' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
          { value: 'success', label: 'Success' },
        ] as const,
        defaultValue: 'info',
      }),
      content: fields.child({
        kind: 'block',
        placeholder: '',
        formatting: 'inherit',
        dividers: 'inherit',
        links: 'inherit',
        relationships: 'inherit',
      }),
    },
    toolbar({ props, onRemove }) {
      return (
        <ToolbarGroup>
          {props.intent.options.map(opt => {
            const Icon = noticeIconMap[opt.value];

            return (
              <Tooltip key={opt.value} content={opt.label} weight="subtle">
                {attrs => (
                  <ToolbarButton
                    isSelected={props.intent.value === opt.value}
                    onClick={() => {
                      props.intent.onChange(opt.value);
                    }}
                    {...attrs}
                  >
                    <Icon size="small" />
                  </ToolbarButton>
                )}
              </Tooltip>
            );
          })}

          <ToolbarSeparator />

          <Tooltip content="Remove" weight="subtle">
            {attrs => (
              <ToolbarButton variant="destructive" onClick={onRemove} {...attrs}>
                <Trash2Icon size="small" />
              </ToolbarButton>
            )}
          </Tooltip>
        </ToolbarGroup>
      );
    },
  }),
  quote: component({
    component: ({ attribution, content }) => {
      return (
        <div
          css={{
            paddingLeft: 16,
            backgroundColor: '#f3f5f6',
            padding: '4px 12px 16px 48px',
            position: 'relative',
            borderRadius: 6,
            ':after': {
              content: '"\\201C"',
              position: 'absolute',
              top: 0,
              left: 16,
              fontSize: '4rem',
            },
          }}
        >
          <div css={{ fontStyle: 'italic', color: '#4A5568' }}>{content}</div>
          <div css={{ fontWeight: 'bold', color: '#47546b' }}>
            <NotEditable>— </NotEditable>
            {attribution}
          </div>
        </div>
      );
    },
    label: 'Quote',
    props: {
      content: fields.child({
        kind: 'block',
        placeholder: 'Quote...',
        formatting: { inlineMarks: 'inherit', softBreaks: 'inherit', alignment: 'inherit' },
        links: 'inherit',
      }),
      attribution: fields.child({ kind: 'inline', placeholder: 'Attribution...' }),
    },
    chromeless: true,
  }),
};
